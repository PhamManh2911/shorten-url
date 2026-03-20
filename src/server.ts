import app from "./app";
import { ENV } from "./configs/env";

import "./database";
import "./consumer";

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port ${ENV.APP_PORT}`);
});
