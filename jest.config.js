export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["vue", "js", "ts", "json"],
};
