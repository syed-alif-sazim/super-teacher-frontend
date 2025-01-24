export const timeStringToDate = (time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number);
    if (hours === undefined || minutes === undefined) {
        throw new Error("Invalid time string");
    }
    return new Date(new Date().setHours(hours, minutes, 0, 0));
  };
  