import dayjs from "dayjs";
export default function getRegularTime() {
  return dayjs().format("dddd, MMMM D, YYYY h:mm A");
}
