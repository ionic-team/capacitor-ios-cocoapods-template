import { MobileProject } from "@trapezedev/project";

const platformDir = process.env["INIT_CWD"];
const capConfig = JSON.parse(process.env["CAPACITOR_CONFIG"]);

const appId = capConfig.appId;
const appName = capConfig.appName
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

try {
  const project = new MobileProject(platformDir, {
    ios: {
      path: "ios/App",
    },
    enableAndroid: false,
    enableIos: true,
  });

  await project.load();

  const appTarget = project.ios.getAppTarget();

  project.ios.setBundleId(appTarget.name, null, appId);
  await project.ios.setDisplayName(appTarget.name, null, appName);

  await project.commit();
} catch (err) {
  console.error(`Could not configure native project: ${err}`);
}
