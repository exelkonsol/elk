const admin = require("firebase-admin");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions/logger");

admin.initializeApp();

const CYCLE_LENGTH_DAYS = 14;
const CYCLE_MS = CYCLE_LENGTH_DAYS * 24 * 60 * 60 * 1000;

exports.rotateMechanismCycle = onSchedule(
  {
    schedule: `every ${CYCLE_LENGTH_DAYS} days`,
    timeZone: "UTC"
  },
  async () => {
    const db = admin.firestore();
    const docRef = db.doc("artifacts/elk/public/data/mechanisms/current");

    await db.runTransaction(async (tx) => {
      const snap = await tx.get(docRef);
      const nowMillis = Date.now();

      if (!snap.exists) {
        const start = admin.firestore.Timestamp.fromMillis(nowMillis);
        const end = admin.firestore.Timestamp.fromMillis(nowMillis + CYCLE_MS);
        tx.set(docRef, {
          isolation: 0,
          anchoring: 0,
          distraction: 0,
          sublimation: 0,
          cycle: 1,
          cycleStartedAt: start,
          cycleEndsAt: end
        });
        logger.info("Initialized cycle document.", { cycle: 1 });
        return;
      }

      const data = snap.data() || {};
      const cycle = typeof data.cycle === "number" ? data.cycle : 1;
      const counts = {
        isolation: Number(data.isolation) || 0,
        anchoring: Number(data.anchoring) || 0,
        distraction: Number(data.distraction) || 0,
        sublimation: Number(data.sublimation) || 0
      };

      const startMillis = data.cycleStartedAt && data.cycleStartedAt.toMillis
        ? data.cycleStartedAt.toMillis()
        : nowMillis;
      const endMillis = data.cycleEndsAt && data.cycleEndsAt.toMillis
        ? data.cycleEndsAt.toMillis()
        : startMillis + CYCLE_MS;

      if (!data.cycleStartedAt || !data.cycleEndsAt || typeof data.cycle !== "number") {
        tx.set(docRef, {
          cycle,
          cycleStartedAt: admin.firestore.Timestamp.fromMillis(startMillis),
          cycleEndsAt: admin.firestore.Timestamp.fromMillis(endMillis)
        }, { merge: true });
      }

      if (nowMillis < endMillis) {
        return;
      }

      const historyRef = docRef.collection("history").doc(`cycle_${cycle}`);
      const historySnap = await tx.get(historyRef);

      if (!historySnap.exists) {
        const totalVotes = counts.isolation + counts.anchoring + counts.distraction + counts.sublimation;
        tx.set(historyRef, {
          ...counts,
          cycle,
          cycleStartedAt: admin.firestore.Timestamp.fromMillis(startMillis),
          cycleEndedAt: admin.firestore.Timestamp.fromMillis(endMillis),
          totalVotes
        });
      }

      const nextCycle = cycle + 1;
      const nextStartMillis = endMillis;
      const nextEndMillis = nextStartMillis + CYCLE_MS;

      tx.set(docRef, {
        isolation: 0,
        anchoring: 0,
        distraction: 0,
        sublimation: 0,
        cycle: nextCycle,
        cycleStartedAt: admin.firestore.Timestamp.fromMillis(nextStartMillis),
        cycleEndsAt: admin.firestore.Timestamp.fromMillis(nextEndMillis)
      }, { merge: true });
    });
  }
);
