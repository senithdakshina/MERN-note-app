import {Ratelimit} from "@upstash/Ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv";

dotenv.config();
//Allowing 10 request per 20 min
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(100,"60 s")
})
export default ratelimit;