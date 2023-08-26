import { z } from "zod";
import { theme } from "~/theme";

export const HeaderCenter = () => {
  return (
    <p className="flex items-center justify-center gap-1 text-xl">
      <b className="flex">
        C
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill={z.string().parse(theme?.colors?.yellow)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.78153 15.1261L11.3446 7.56307L18.9077 15.1261L11.3446 22.6892L3.78153 15.1261Z" />
          <path d="M11.3446 7.56307C13.4331 9.65155 13.4331 13.0377 11.3446 15.1261C9.25612 17.2146 5.87002 17.2146 3.78153 15.1261C1.69305 13.0377 1.69305 9.65155 3.78153 7.56307C5.87002 5.47459 9.25612 5.47459 11.3446 7.56307Z" />
          <path d="M18.9077 7.56307C20.9962 9.65155 20.9962 13.0377 18.9077 15.1261C16.8192 17.2146 13.4331 17.2146 11.3446 15.1261C9.25612 13.0377 9.25612 9.65155 11.3446 7.56307C13.4331 5.47459 16.8192 5.47459 18.9077 7.56307Z" />
        </svg>
        T
      </b>
      15.06.24
    </p>
  );
};
