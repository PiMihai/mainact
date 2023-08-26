/// <reference lib="dom" />
import * as path from "https://deno.land/std@0.200.0/path/mod.ts";
import { readFileSync } from "https://esm.sh/data-forge-fs@0.0.9";
import HighchartsReact from "https://esm.sh/highcharts-react-official@3.2.0";
import Highcharts from "https://esm.sh/highcharts@11.1.0";
import highchartsAccessibility from "https://esm.sh/highcharts@11.1.0/modules/accessibility";
import highchartsExporting from "https://esm.sh/highcharts@11.1.0/modules/exporting";
import React from "https://esm.sh/react@18.2.0";

export const getProps = () => {
  const dir = path.dirname(path.fromFileUrl(import.meta.url));
  const data = readFileSync(`${dir}/example.csv`)
    .parseCSV({ dynamicTyping: true })
    .toArray();
  return { data };
};

export const Render = ({ data }: ReturnType<typeof getProps>) => {
  highchartsAccessibility(Highcharts);
  highchartsExporting(Highcharts);

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: "My chart",
          },
          xAxis: {
            categories: data.map((row) => row.name),
          },
          series: [
            {
              type: "column",
              color: Highcharts.getOptions().colors![0],
              data: data.map((row) => row.grade),
            },
          ],
        }}
      />
    </>
  );
};
