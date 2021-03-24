import Service from "./service";
import de from "element-ui/src/locale/lang/de";

export const getDoctorTitle = async () => {
  const res = await Service.goods().getDoctorTitle({});
  return res.data.data
}

