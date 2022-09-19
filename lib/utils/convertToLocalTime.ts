import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const convertToLocalDate = (date: Date) => {
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const convertedDate = utcToZonedTime(date, timeZone);
	return format(convertedDate, "do MMMM y");
};

const convertToLocalTime = (date: Date) => {
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const convertedDate = utcToZonedTime(date, timeZone);
	return format(convertedDate, "h:mbbb, do MMMM y");
};

export { convertToLocalDate, convertToLocalTime };
