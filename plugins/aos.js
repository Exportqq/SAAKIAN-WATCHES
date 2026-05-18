import AOS from "aos";

export default ({ app }) => {
  if (process.client) {
    AOS.init({
      duration: 600,
    });
  }
};
