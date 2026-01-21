import ratelimit from "../config/upstash.js";

const ratelimmiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit(req.ip || "global");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later!",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit skipped (Upstash error):", error.message);
    next(); // IMPORTANT: do NOT pass error
  }
};

export default ratelimmiter;
