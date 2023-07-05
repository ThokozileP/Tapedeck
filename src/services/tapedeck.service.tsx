import { useEffect, useState } from "react";

interface Tape {
  page: string;
  img: string;
  thumb: string;
  playingTime: string;
  type?: string;
  brand: string;
  color?: string;
}

export const useApiGet = (url: string) => {
  const [tapesFormated, setTapesFormated] = useState<Tape[]>([]);
  const API_KEY = `${process.env.REACT_APP_TAPEDECK_API_KEY}`;

  useEffect(() => {
    const fetchTapes = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        if (response.ok) {
          const data = await response.json();
          //remove the string key from the response
          const mappedValues = data.map((tape: { [x: string]: any }) => {
            const tapeKey = Object.keys(tape);

            const tapeData = tape[tapeKey[0]];

            return tapeData;
          });
          // create tape objects from the array values
          // this can also be mapped straight from the array values above
          const objects = mappedValues.map((tape: { [x: string]: any }) => {
            let page = undefined;
            let pageUrl = "";
            let img = undefined;
            let thumb = undefined;
            let playingTime = "";
            let type = "";
            let color = "";
            let brand = "";

            tape.forEach((element: any) => {
              if (element.hasOwnProperty("page")) {
                const pagePath = element.page;
                pageUrl = pagePath;
                page = <a href={pagePath}>Link</a>;
              } else if (element.hasOwnProperty("img")) {
                const imagePath = element.img;
                img = <img src={imagePath} alt="" />;
              } else if (element.hasOwnProperty("thumb")) {
                const thumbPath = element.thumb;
                thumb = (
                  <a href={pageUrl}>
                    <img src={thumbPath} alt="" />
                  </a>
                );
              } else if (element.hasOwnProperty("playingTime")) {
                playingTime = element.playingTime;
              } else if (element.hasOwnProperty("type")) {
                type = element.type;
              } else if (element.hasOwnProperty("color")) {
                color = element.color;
              } else if (element.hasOwnProperty("brand")) {
                brand = element.brand;
              }
            });

            return {
              page: page,
              img: img,
              thumb: thumb,
              playingTime: playingTime,
              type: type,
              color: color,
              brand: brand,
            };
          });
          const sortByBrand = [...objects].sort((a, b) =>
            a.brand.localeCompare(b.brand)
          );
          setTapesFormated(sortByBrand);
        } else {
          console.error(
            "Failed to fetch tapes:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Failed to fetch tapes:", error);
      }
    };

    fetchTapes();
  }, [API_KEY, url]);

  return tapesFormated;
};
