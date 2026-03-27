import app from "./app";
import { ENV } from "./configs/env";

import "./cache";
import "./database";

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
