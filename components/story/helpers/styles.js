import { StyleSheet } from "react-native";
// import { COLOR_BLACK } from "../../../../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexGrow: 1,
    position: "relative",
    overflow: "hidden",
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
});

export default styles;
