import { lineGraph, barChart, groupedBar, pieChart, dataTable, processDiagram } from "@/lib/utils/svg-chart";

export interface Task1Item {
  question: string;
  chartLabel: string;
  svg: string;
}

export const TASK1_PRACTICE: Task1Item[] = [

  // ═══════════════════════════════════════════
  //  LINE GRAPHS  (14)
  // ═══════════════════════════════════════════

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Percentage of Households: Owned vs Rented Accommodation",
      sub: "England and Wales, 1918–2011",
      xLabels: ["1918","1939","1953","1961","1971","1981","1991","2001","2011"],
      yMin: 0, yMax: 80, yUnit: "%",
      series: [
        { name: "Owner-occupied", data: [23, 32, 38, 45, 50, 57, 68, 70, 65] },
        { name: "Rented",         data: [57, 46, 42, 37, 30, 24, 18, 10, 15] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the percentage of people using the internet in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Internet Users as a Percentage of Population",
      sub: "USA, Germany and Brazil, 2000–2020",
      xLabels: ["2000","2002","2004","2006","2008","2010","2012","2014","2016","2018","2020"],
      yMin: 0, yMax: 100, yUnit: "%",
      series: [
        { name: "USA",     data: [43, 49, 55, 62, 70, 71, 78, 83, 87, 90, 92] },
        { name: "Germany", data: [30, 37, 44, 51, 68, 76, 82, 86, 89, 91, 93] },
        { name: "Brazil",  data: [3,  5,  8,  14, 22, 34, 47, 57, 61, 68, 74] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows global average temperatures compared to the 20th century average from 1960 to 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Global Average Temperature Anomaly",
      sub: "Degrees above/below 20th-century average, 1960–2022",
      xLabels: ["1960","1964","1968","1972","1976","1980","1984","1988","1992","1996","2000","2004","2008","2012","2016","2020","2022"],
      yMin: -0.3, yMax: 1.1, yUnit: "°C", ySteps: 7,
      series: [
        { name: "Temperature anomaly", data: [-0.02,0.00,-0.06,0.01,-0.10,0.25,0.15,0.38,0.22,0.33,0.42,0.55,0.56,0.63,0.99,0.98,1.04] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows life expectancy at birth in Japan, Brazil and Nigeria between 1970 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Life Expectancy at Birth",
      sub: "Japan, Brazil and Nigeria, 1970–2020",
      xLabels: ["1970","1975","1980","1985","1990","1995","2000","2005","2010","2015","2020"],
      yMin: 35, yMax: 90, yUnit: " yrs", ySteps: 6,
      series: [
        { name: "Japan",   data: [72, 74, 76, 78, 79, 80, 81, 82, 83, 84, 85] },
        { name: "Brazil",  data: [59, 61, 63, 65, 67, 69, 70, 72, 73, 74, 75] },
        { name: "Nigeria", data: [42, 44, 44, 45, 46, 45, 46, 49, 52, 54, 55] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the number of international tourist arrivals worldwide from 1995 to 2019 (in millions). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "International Tourist Arrivals Worldwide",
      sub: "Millions of arrivals, 1995–2019",
      xLabels: ["1995","1997","1999","2001","2003","2005","2007","2009","2011","2013","2015","2017","2019"],
      yMin: 400, yMax: 1600, yUnit: "M",
      series: [
        { name: "Total arrivals", data: [527, 598, 657, 688, 694, 809, 924, 891, 995, 1086, 1189, 1333, 1461] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the number of electric vehicles sold globally between 2012 and 2022 (in millions). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Global Electric Vehicle Sales",
      sub: "Millions of units sold, 2012–2022",
      xLabels: ["2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"],
      yMin: 0, yMax: 11, yUnit: "M",
      series: [
        { name: "Battery electric (BEV)", data: [0.05, 0.1, 0.2, 0.35, 0.45, 0.65, 1.1, 1.4, 1.8, 4.5, 7.8] },
        { name: "Plug-in hybrid (PHEV)",  data: [0.04, 0.06, 0.1, 0.2, 0.3, 0.45, 0.7, 0.9, 1.0, 1.9, 2.9] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the unemployment rate in the United Kingdom, Spain and Japan between 2007 and 2016. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Unemployment Rate (%)",
      sub: "UK, Spain and Japan, 2007–2016",
      xLabels: ["2007","2008","2009","2010","2011","2012","2013","2014","2015","2016"],
      yMin: 0, yMax: 28, yUnit: "%",
      series: [
        { name: "UK",    data: [5.3, 5.7, 7.6, 7.9, 8.1, 8.1, 7.6, 6.2, 5.4, 4.9] },
        { name: "Spain", data: [8.3, 11.3, 18.0, 20.1, 21.7, 24.8, 26.1, 24.4, 22.1, 19.6] },
        { name: "Japan", data: [3.9, 4.0, 5.1, 5.1, 4.6, 4.3, 4.0, 3.6, 3.4, 3.1] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the share of electricity generated from renewable sources in Germany, the UK and China between 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Share of Electricity from Renewable Sources",
      sub: "Germany, UK and China, 2005–2020",
      xLabels: ["2005","2007","2009","2011","2013","2015","2017","2019","2020"],
      yMin: 0, yMax: 50, yUnit: "%",
      series: [
        { name: "Germany", data: [10, 14, 17, 22, 27, 32, 38, 44, 47] },
        { name: "UK",      data: [4,  5,  7,  11, 16, 25, 31, 38, 43] },
        { name: "China",   data: [16, 16, 17, 18, 19, 22, 25, 27, 29] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the number of people (in millions) living in urban areas in Africa, Asia and Europe between 1950 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Urban Population (millions)",
      sub: "Africa, Asia and Europe, 1950–2020",
      xLabels: ["1950","1960","1970","1980","1990","2000","2010","2020"],
      yMin: 0, yMax: 2500, yUnit: "M",
      series: [
        { name: "Asia",   data: [245, 360, 505, 730, 1000, 1380, 1850, 2300] },
        { name: "Europe", data: [285, 350, 415, 470, 508,  530,  540,  560] },
        { name: "Africa", data: [33,  54,  86,  135, 204,  295,  415,  590] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the percentage of adults classified as obese in Australia, the UK and the USA between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Adult Obesity Rate (%)",
      sub: "Australia, UK and USA, 1990–2020",
      xLabels: ["1990","1993","1996","1999","2002","2005","2008","2011","2014","2017","2020"],
      yMin: 0, yMax: 45, yUnit: "%",
      series: [
        { name: "USA",       data: [11, 13, 16, 20, 25, 28, 30, 32, 34, 37, 40] },
        { name: "UK",        data: [10, 12, 15, 17, 19, 21, 23, 25, 27, 28, 30] },
        { name: "Australia", data: [9,  11, 13, 15, 17, 19, 22, 24, 26, 28, 30] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the annual sales of digital music downloads and physical music formats (CDs and vinyl) in the USA between 2004 and 2018 (in billions of US dollars). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Music Format Sales Revenue in the USA",
      sub: "Billions of USD, 2004–2018",
      xLabels: ["2004","2006","2008","2010","2012","2014","2016","2018"],
      yMin: 0, yMax: 14, yUnit: "B",
      series: [
        { name: "Physical (CD/Vinyl)", data: [12.2, 10.5, 8.1, 6.2, 4.5, 3.0, 2.4, 2.0] },
        { name: "Digital downloads",   data: [0.2, 1.2, 2.9, 4.1, 4.3, 3.8, 2.6, 1.8] },
        { name: "Streaming",           data: [0.0, 0.1, 0.2, 0.5, 1.1, 2.2, 4.5, 7.4] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the number of cars manufactured annually in China, Germany and the USA between 2000 and 2022 (in millions). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Car Manufacturing Output (millions of vehicles)",
      sub: "China, Germany and USA, 2000–2022",
      xLabels: ["2000","2002","2004","2006","2008","2010","2012","2014","2016","2018","2020","2022"],
      yMin: 0, yMax: 30, yUnit: "M",
      series: [
        { name: "China",   data: [2.1, 3.3, 5.1, 7.2, 9.3, 18.2, 19.3, 23.7, 28.1, 27.8, 25.2, 27.0] },
        { name: "USA",     data: [12.8, 12.3, 11.9, 11.3, 8.7, 7.8, 10.3, 11.7, 12.2, 11.3, 8.8, 10.1] },
        { name: "Germany", data: [5.5, 5.4, 5.6, 5.8, 6.0, 5.6, 5.6, 5.9, 6.1, 5.1, 3.7, 3.7] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the number of people aged 65 and over as a percentage of the total population in Japan, France and Mexico between 1970 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Population Aged 65+ as % of Total",
      sub: "Japan, France and Mexico, 1970–2020",
      xLabels: ["1970","1975","1980","1985","1990","1995","2000","2005","2010","2015","2020"],
      yMin: 0, yMax: 30, yUnit: "%",
      series: [
        { name: "Japan",  data: [7.1, 7.9, 9.1, 10.3, 12.1, 14.6, 17.4, 20.2, 23.1, 26.6, 28.7] },
        { name: "France", data: [12.9, 13.5, 13.9, 12.8, 14.1, 15.3, 16.0, 16.4, 16.8, 18.8, 21.0] },
        { name: "Mexico", data: [3.6, 3.7, 3.8, 3.9, 4.2, 4.7, 5.3, 6.0, 6.9, 7.8, 9.0] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the average price of a house (in thousands of pounds) in London, Manchester and Edinburgh between 2005 and 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Average House Prices",
      sub: "London, Manchester and Edinburgh (£ thousands), 2005–2022",
      xLabels: ["2005","2007","2009","2011","2013","2015","2017","2019","2021","2022"],
      yMin: 80, yMax: 550, yUnit: "k",
      series: [
        { name: "London",     data: [250, 310, 280, 315, 365, 450, 490, 480, 510, 540] },
        { name: "Edinburgh",  data: [145, 175, 160, 165, 175, 200, 235, 265, 300, 320] },
        { name: "Manchester", data: [120, 145, 125, 130, 140, 165, 195, 215, 245, 260] },
      ],
    }),
  },

  // ═══════════════════════════════════════════
  //  BAR CHARTS  (12)
  // ═══════════════════════════════════════════

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the number of university graduates in Canada from 1992 to 2007. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Number of University Graduates in Canada",
      sub: "1992–2007 (in thousands)",
      labels: ["1992","1993","1995","1997","1999","2001","2004","2007"],
      data: [162, 165, 170, 176, 185, 198, 218, 240],
      yMax: 280, yUnit: "k",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the average number of hours worked per year by employees in eight countries in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Average Annual Working Hours per Employee",
      sub: "Selected countries, 2022",
      labels: ["Mexico","South Korea","Greece","USA","Japan","UK","Germany","Denmark"],
      data: [2128, 1915, 1886, 1811, 1607, 1532, 1349, 1363],
      yMax: 2400,
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the percentage of adults who participated in at least one sport or physical activity per week in six European countries in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Percentage of Adults Participating in Sport Weekly",
      sub: "Selected European countries, 2020",
      labels: ["Finland","Sweden","Denmark","Netherlands","Germany","France","Spain","Italy"],
      data: [71, 68, 64, 58, 44, 38, 35, 29],
      yMax: 80, yUnit: "%",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows CO₂ emissions per person (in tonnes) in eight countries in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "CO₂ Emissions Per Capita",
      sub: "Tonnes per person, 2020",
      labels: ["Qatar","Australia","USA","Canada","Russia","Germany","China","India"],
      data: [31.4, 14.9, 14.2, 14.0, 11.5, 7.7, 7.1, 1.9],
      yMax: 36, yUnit: "t",
      color: "#ea580c",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the number of visitors (in millions) to the ten most visited museums in the world in 2019. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Most Visited Museums Worldwide",
      sub: "Millions of visitors, 2019",
      labels: ["Louvre","Nat'l China","Nat. History\nLondon","Vatican","Smithsonian","British\nMuseum","Tate Modern","Nat. Palace\nTaipei","Hermitage","Uffizi"],
      data: [9.6, 8.0, 5.7, 5.1, 4.9, 4.7, 4.1, 3.9, 3.7, 2.3],
      yMax: 11, yUnit: "M",
      color: "#16a34a",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the percentage of households in six countries that sorted waste for recycling in 2021. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Household Waste Recycling Rate",
      sub: "Percentage of households sorting waste, 2021",
      labels: ["Germany","Austria","Belgium","Netherlands","UK","France","Spain","Greece"],
      data: [67, 62, 58, 55, 44, 40, 35, 19],
      yMax: 80, yUnit: "%",
      color: "#16a34a",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the average monthly salary (in US dollars) for software engineers in eight major cities in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Average Monthly Salary for Software Engineers",
      sub: "USD per month, 2023",
      labels: ["San Francisco","New York","London","Zurich","Sydney","Singapore","Berlin","Dubai"],
      data: [9800, 8900, 6200, 7800, 5800, 6500, 4900, 5400],
      yMax: 11000, yUnit: "$",
      color: "#7c3aed",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the total installed wind energy capacity (in gigawatts) in the top seven countries in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Total Installed Wind Energy Capacity",
      sub: "Gigawatts (GW), top 7 countries, 2022",
      labels: ["China","USA","Germany","India","Spain","UK","France"],
      data: [338, 144, 63, 44, 29, 26, 21],
      yMax: 380, yUnit: "GW",
      color: "#0891b2",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows coffee consumption per person per year (in kilograms) in ten countries in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Coffee Consumption Per Capita",
      sub: "Kilograms per person per year, 2022",
      labels: ["Finland","Norway","Iceland","Denmark","Netherlands","Sweden","Switzerland","Belgium","Canada","USA"],
      data: [12.0, 9.9, 9.0, 8.7, 8.4, 8.2, 7.9, 6.8, 6.5, 4.5],
      yMax: 14, yUnit: "kg",
      color: "#ca8a04",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the percentage of commuters using public transport to travel to work in eight major cities in 2021. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Percentage of Commuters Using Public Transport",
      sub: "Major cities, 2021",
      labels: ["Hong Kong","Tokyo","Singapore","Moscow","London","New York","Sydney","Los Angeles"],
      data: [73, 68, 65, 57, 45, 32, 27, 12],
      yMax: 85, yUnit: "%",
      color: "#4f46e5",
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the number of foreign language speakers (in millions) for the six most widely spoken second languages worldwide in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Most Widely Spoken Languages as a Second Language",
      sub: "Millions of second-language speakers, 2023",
      labels: ["English","Mandarin","French","Spanish","Arabic","Russian"],
      data: [1080, 199, 153, 91, 274, 110],
      yMax: 1200, yUnit: "M",
      color: "#db2777",
    }),
  },

  // ═══════════════════════════════════════════
  //  GROUPED BAR CHARTS  (7)
  // ═══════════════════════════════════════════

  {
    chartLabel: "Grouped Bar Chart",
    question: "The bar chart below shows CO₂ emissions per person (in tonnes) in five countries in 1990, 2000, and 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "CO₂ Emissions Per Person (tonnes)",
      sub: "Five countries, 1990, 2000 and 2015",
      groups: ["USA","Australia","UK","China","India"],
      yMax: 25,
      series: [
        { name: "1990", data: [19.3, 15.4, 9.8, 2.2, 0.8] },
        { name: "2000", data: [20.6, 17.2, 9.2, 2.9, 1.1] },
        { name: "2015", data: [16.5, 15.8, 6.5, 7.6, 1.9] },
      ],
    }),
  },

  {
    chartLabel: "Grouped Bar Chart",
    question: "The bar chart below shows the percentage of men and women in full-time employment in four countries in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "Full-Time Employment Rate by Gender (%)",
      sub: "Selected countries, 2000 and 2020",
      groups: ["Sweden","UK","USA","Japan"],
      yMax: 90, yUnit: "%",
      series: [
        { name: "Men 2000",   data: [73, 71, 74, 80] },
        { name: "Women 2000", data: [51, 45, 52, 48] },
        { name: "Men 2020",   data: [70, 69, 72, 75] },
        { name: "Women 2020", data: [62, 58, 64, 58] },
      ],
    }),
  },

  {
    chartLabel: "Grouped Bar Chart",
    question: "The bar chart below shows the percentage of students enrolled in primary, secondary and tertiary education in four regions in 2018. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "Education Enrolment Rate by Level (%)",
      sub: "Four world regions, 2018",
      groups: ["N. America","Europe","S. America","Sub-Sah. Africa"],
      yMax: 110, yUnit: "%",
      series: [
        { name: "Primary",   data: [98, 99, 95, 80] },
        { name: "Secondary", data: [92, 91, 82, 41] },
        { name: "Tertiary",  data: [66, 61, 45, 9]  },
      ],
    }),
  },

  {
    chartLabel: "Grouped Bar Chart",
    question: "The chart below shows the average number of hours per week spent on selected leisure activities by people in three age groups in the UK in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "Weekly Hours Spent on Leisure Activities by Age Group",
      sub: "UK, 2022",
      groups: ["TV/streaming","Social media","Exercise","Reading","Gaming"],
      yMax: 18,
      series: [
        { name: "18–34", data: [10, 14, 5, 2, 7] },
        { name: "35–54", data: [14, 7,  4, 4, 3] },
        { name: "55+",   data: [17, 3,  4, 7, 1] },
      ],
    }),
  },

  {
    chartLabel: "Grouped Bar Chart",
    question: "The chart below shows the percentage of households owning at least one car in four countries in 1990, 2000, and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "Household Car Ownership Rate (%)",
      sub: "Four countries, 1990, 2000 and 2020",
      groups: ["USA","Germany","UK","Brazil"],
      yMax: 100, yUnit: "%",
      series: [
        { name: "1990", data: [80, 66, 60, 24] },
        { name: "2000", data: [84, 73, 67, 32] },
        { name: "2020", data: [88, 78, 74, 49] },
      ],
    }),
  },

  {
    chartLabel: "Grouped Bar Chart",
    question: "The chart below shows the percentage of students achieving Grade A in maths and science at secondary school in five countries in 2010 and 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "Percentage of Students Achieving Top Grade in STEM Subjects",
      sub: "Maths and Science, 2010 vs 2022",
      groups: ["Singapore","South Korea","UK","USA","Brazil"],
      yMax: 70, yUnit: "%",
      series: [
        { name: "Maths 2010",   data: [58, 52, 34, 29, 12] },
        { name: "Maths 2022",   data: [63, 56, 39, 32, 16] },
        { name: "Science 2010", data: [54, 49, 31, 27, 10] },
        { name: "Science 2022", data: [60, 53, 36, 30, 14] },
      ],
    }),
  },

  {
    chartLabel: "Grouped Bar Chart",
    question: "The chart below shows spending on healthcare and education as a percentage of GDP in four countries in 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "Healthcare and Education Spending as % of GDP",
      sub: "Four countries, 2005 and 2020",
      groups: ["USA","UK","Germany","India"],
      yMax: 18, yUnit: "%",
      series: [
        { name: "Healthcare 2005", data: [13.5, 7.3, 9.8, 3.4] },
        { name: "Healthcare 2020", data: [16.8, 10.2, 11.7, 3.8] },
        { name: "Education 2005",  data: [5.4, 5.0, 4.4, 2.9] },
        { name: "Education 2020",  data: [5.0, 4.9, 4.6, 4.4] },
      ],
    }),
  },

  // ═══════════════════════════════════════════
  //  PIE CHARTS  (8)
  // ═══════════════════════════════════════════

  {
    chartLabel: "Pie Charts",
    question: "The pie charts below compare water usage in San Diego (USA) and Sydney (Australia). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: pieChart({
      title: "Water Usage: San Diego (USA) vs Sydney (Australia)",
      pies: [
        { label: "San Diego", slices: [
          { name: "Residential", value: 39, color: "#16a34a" },
          { name: "Industry",    value: 27, color: "#16a34a" },
          { name: "Agriculture", value: 28, color: "#ca8a04" },
          { name: "Other",       value: 6,  color: "#dc2626" },
        ]},
        { label: "Sydney", slices: [
          { name: "Residential", value: 65, color: "#16a34a" },
          { name: "Industry",    value: 10, color: "#16a34a" },
          { name: "Agriculture", value: 20, color: "#ca8a04" },
          { name: "Other",       value: 5,  color: "#dc2626" },
        ]},
      ],
    }),
  },

  {
    chartLabel: "Pie Charts",
    question: "The pie charts below show global electricity production by energy source in 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: pieChart({
      title: "Global Electricity Production by Source",
      sub: "1990 vs 2020",
      pies: [
        { label: "1990", slices: [
          { name: "Coal",       value: 37, color: "#374151" },
          { name: "Natural gas",value: 17, color: "#f97316" },
          { name: "Hydro",      value: 19, color: "#16a34a" },
          { name: "Nuclear",    value: 17, color: "#7c3aed" },
          { name: "Oil",        value: 10, color: "#ca8a04" },
        ]},
        { label: "2020", slices: [
          { name: "Coal",       value: 35, color: "#374151" },
          { name: "Natural gas",value: 23, color: "#f97316" },
          { name: "Hydro",      value: 16, color: "#16a34a" },
          { name: "Nuclear",    value: 10, color: "#7c3aed" },
          { name: "Renewables", value: 12, color: "#16a34a" },
          { name: "Oil",        value: 4,  color: "#ca8a04" },
        ]},
      ],
    }),
  },

  {
    chartLabel: "Pie Chart",
    question: "The pie chart below shows how an average UK family spent its household income in 2022. Summarise the information by selecting and reporting the main features.",
    svg: pieChart({
      title: "Average UK Household Spending by Category, 2022",
      pies: [{
        label: "",
        slices: [
          { name: "Housing",     value: 29, color: "#7c3aed" },
          { name: "Transport",   value: 15, color: "#16a34a" },
          { name: "Food",        value: 16, color: "#16a34a" },
          { name: "Recreation",  value: 11, color: "#f97316" },
          { name: "Clothing",    value: 7,  color: "#db2777" },
          { name: "Health",      value: 8,  color: "#0891b2" },
          { name: "Other",       value: 14, color: "#ca8a04" },
        ],
      }],
    }),
  },

  {
    chartLabel: "Pie Charts",
    question: "The pie charts below show the breakdown of global plastic waste by sector in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: pieChart({
      title: "Global Plastic Waste by Sector",
      sub: "2000 vs 2020",
      pies: [
        { label: "2000", slices: [
          { name: "Packaging",    value: 42, color: "#7c3aed" },
          { name: "Textiles",     value: 14, color: "#16a34a" },
          { name: "Construction", value: 20, color: "#16a34a" },
          { name: "Electronics",  value: 6,  color: "#f97316" },
          { name: "Other",        value: 18, color: "#ca8a04" },
        ]},
        { label: "2020", slices: [
          { name: "Packaging",    value: 47, color: "#7c3aed" },
          { name: "Textiles",     value: 16, color: "#16a34a" },
          { name: "Construction", value: 16, color: "#16a34a" },
          { name: "Electronics",  value: 9,  color: "#f97316" },
          { name: "Other",        value: 12, color: "#ca8a04" },
        ]},
      ],
    }),
  },

  {
    chartLabel: "Pie Charts",
    question: "The pie charts below show how a 24-hour day is divided between different activities for a typical working adult in the UK in 1990 and 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: pieChart({
      title: "How a Typical Working Day is Spent",
      sub: "UK working adults, 1990 vs 2022",
      pies: [
        { label: "1990", slices: [
          { name: "Sleep",       value: 8,   color: "#374151" },
          { name: "Work",        value: 8,   color: "#7c3aed" },
          { name: "TV/Media",    value: 3,   color: "#16a34a" },
          { name: "Socialising", value: 2,   color: "#16a34a" },
          { name: "Exercise",    value: 1,   color: "#ea580c" },
          { name: "Other",       value: 2,   color: "#ca8a04" },
        ]},
        { label: "2022", slices: [
          { name: "Sleep",       value: 7,   color: "#374151" },
          { name: "Work",        value: 8,   color: "#7c3aed" },
          { name: "TV/Media",    value: 4,   color: "#16a34a" },
          { name: "Socialising", value: 1.5, color: "#16a34a" },
          { name: "Exercise",    value: 1,   color: "#ea580c" },
          { name: "Other",       value: 2.5, color: "#ca8a04" },
        ]},
      ],
    }),
  },

  {
    chartLabel: "Pie Charts",
    question: "The pie charts below show the main causes of deforestation in two regions of the world — the Amazon Basin and South-East Asia — in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: pieChart({
      title: "Causes of Deforestation by Region, 2020",
      pies: [
        { label: "Amazon Basin", slices: [
          { name: "Cattle ranching", value: 65, color: "#ea580c" },
          { name: "Agriculture",     value: 25, color: "#16a34a" },
          { name: "Logging",         value: 8,  color: "#ca8a04" },
          { name: "Other",           value: 2,  color: "#9ca3af" },
        ]},
        { label: "South-East Asia", slices: [
          { name: "Palm oil",   value: 47, color: "#16a34a" },
          { name: "Logging",    value: 28, color: "#ca8a04" },
          { name: "Agriculture",value: 18, color: "#ea580c" },
          { name: "Other",      value: 7,  color: "#9ca3af" },
        ]},
      ],
    }),
  },

  {
    chartLabel: "Pie Chart",
    question: "The pie chart below shows the reasons given by people in the UK for changing jobs in 2021. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: pieChart({
      title: "Reasons for Changing Jobs — UK Workers, 2021",
      pies: [{
        label: "",
        slices: [
          { name: "Better pay",      value: 34, color: "#7c3aed" },
          { name: "Career growth",   value: 22, color: "#16a34a" },
          { name: "Work-life balance",value: 18,color: "#16a34a" },
          { name: "Poor management", value: 12, color: "#ea580c" },
          { name: "Location",        value: 8,  color: "#db2777" },
          { name: "Other",           value: 6,  color: "#9ca3af" },
        ],
      }],
    }),
  },

  {
    chartLabel: "Pie Charts",
    question: "The pie charts below show the main sources of energy used for heating homes in the UK and in Sweden in 2021. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: pieChart({
      title: "Energy Sources for Home Heating",
      sub: "UK vs Sweden, 2021",
      pies: [
        { label: "UK", slices: [
          { name: "Natural gas", value: 74, color: "#f97316" },
          { name: "Electricity", value: 13, color: "#7c3aed" },
          { name: "Oil",         value: 7,  color: "#374151" },
          { name: "Other",       value: 6,  color: "#9ca3af" },
        ]},
        { label: "Sweden", slices: [
          { name: "District heating", value: 51, color: "#16a34a" },
          { name: "Heat pumps",       value: 23, color: "#16a34a" },
          { name: "Electricity",      value: 13, color: "#7c3aed" },
          { name: "Biomass",          value: 9,  color: "#ca8a04" },
          { name: "Other",            value: 4,  color: "#9ca3af" },
        ]},
      ],
    }),
  },

  // ═══════════════════════════════════════════
  //  TABLES  (7)
  // ═══════════════════════════════════════════

  {
    chartLabel: "Table",
    question: "The table below gives information about the underground railway systems in six cities. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: dataTable({
      title: "Underground Railway Systems in Six Cities",
      headers: ["City", "Date opened", "Route (km)", "Passengers/yr (m)"],
      rows: [
        ["London", 1863, 394, 775],
        ["Paris", 1900, 199, "1,191"],
        ["Tokyo", 1927, 155, "1,927"],
        ["Washington DC", 1976, 126, 144],
        ["Kyoto", 1981, 11, 45],
        ["Los Angeles", 2001, 28, 50],
      ],
    }),
  },

  {
    chartLabel: "Table",
    question: "The table below shows selected health statistics for five countries in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: dataTable({
      title: "Selected Health Statistics by Country, 2020",
      headers: ["Country", "Life expectancy", "Infant mortality\n(per 1,000)", "Doctors\n(per 10,000)", "Health spend\n(% GDP)"],
      rows: [
        ["Japan",   84.3, 1.8, 24, "10.7%"],
        ["Germany", 81.7, 3.2, 43, "11.7%"],
        ["Brazil",  76.0, 12.5, 22, "9.6%"],
        ["China",   77.4, 6.8, 20, "5.7%"],
        ["Nigeria", 54.5, 68.0, 4, "3.4%"],
      ],
    }),
  },

  {
    chartLabel: "Table",
    question: "The table below shows information about the five longest rivers in the world. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: dataTable({
      title: "The World's Five Longest Rivers",
      headers: ["River", "Length (km)", "Drainage area\n(km²)", "Countries\ntraversed", "Outflow"],
      rows: [
        ["Nile",    "6,650", "3,254,555", 11, "Mediterranean Sea"],
        ["Amazon",  "6,400", "7,050,000", 9,  "Atlantic Ocean"],
        ["Yangtze", "6,300", "1,800,000", 1,  "East China Sea"],
        ["Mississippi", "6,275","2,980,000",2, "Gulf of Mexico"],
        ["Yenisei", "5,539", "2,580,000", 2,  "Kara Sea"],
      ],
    }),
  },

  {
    chartLabel: "Table",
    question: "The table below shows the results of a survey on language learning among adults in six countries in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: dataTable({
      title: "Foreign Language Learning Among Adults, 2022",
      headers: ["Country", "Currently\nlearning (%)", "Most studied\nlanguage", "Avg. hours\nper week", "Main motivation"],
      rows: [
        ["Sweden",  34, "English", 4.2, "Work"],
        ["Germany", 28, "English", 3.5, "Career"],
        ["France",  22, "English", 2.8, "Travel"],
        ["UK",      12, "Spanish", 1.9, "Travel"],
        ["USA",     15, "Spanish", 2.1, "Work"],
        ["Brazil",  20, "English", 3.0, "Career"],
      ],
    }),
  },

  {
    chartLabel: "Table",
    question: "The table below gives information about the ten busiest airports in the world in 2019. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: dataTable({
      title: "World's Busiest Airports, 2019",
      headers: ["Airport", "Country", "Passengers\n(millions)", "Runways", "International\nshare (%)"],
      rows: [
        ["Atlanta Hartsfield", "USA", 110, 5, 11],
        ["Beijing Capital",    "China", 100, 3, 22],
        ["Dubai Int'l",        "UAE", 86, 2, 94],
        ["LA Int'l",           "USA", 88, 4, 28],
        ["Tokyo Haneda",       "Japan", 85, 4, 14],
        ["O'Hare Chicago",     "USA", 84, 8, 21],
      ],
    }),
  },

  {
    chartLabel: "Table",
    question: "The table below gives information about six popular social media platforms in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: dataTable({
      title: "Major Social Media Platforms, 2023",
      headers: ["Platform", "Founded", "Monthly users\n(billions)", "Avg. daily\ntime (min)", "Primary\ncontent type"],
      rows: [
        ["Facebook",  2004, 3.0, 33, "Mixed"],
        ["YouTube",   2005, 2.7, 45, "Video"],
        ["Instagram", 2010, 2.0, 29, "Photo/Video"],
        ["TikTok",    2016, 1.5, 52, "Short video"],
        ["Twitter/X", 2006, 0.55,31, "Text/Media"],
        ["LinkedIn",  2003, 0.93,7,  "Professional"],
      ],
    }),
  },

  {
    chartLabel: "Table",
    question: "The table below shows the projected population and GDP per capita for six countries in 2030. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: dataTable({
      title: "Projected Population and Wealth Indicators, 2030",
      headers: ["Country", "Population\n(millions)", "GDP per capita\n(USD)", "Urban\npopulation (%)", "Median age"],
      rows: [
        ["USA",     340, "72,000", 86, 38.5],
        ["China",   1402,"23,000", 73, 43.1],
        ["India",   1500,"6,500",  40, 32.1],
        ["Germany", 84,  "63,000", 78, 48.2],
        ["Nigeria", 263, "3,800",  55, 19.0],
        ["Brazil",  223, "16,000", 89, 36.7],
      ],
    }),
  },

  // ═══════════════════════════════════════════
  //  PROCESS DIAGRAMS  (7)
  // ═══════════════════════════════════════════

  {
    chartLabel: "Process Diagram",
    question: "The diagram below illustrates the process of recycling paper. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: processDiagram({
      title: "The Process of Recycling Paper",
      steps: ["Collection & sorting", "Pulping with water & chemicals", "Cleaning & screening", "De-inking", "Bleaching", "Sheet formation", "Drying & cutting", "New paper products"],
      color: "#16a34a",
      layout: "snake",
    }),
  },

  {
    chartLabel: "Process Diagram",
    question: "The diagram below shows how drinking water is purified and treated before it reaches people's homes. Summarise the information by selecting and reporting the main features.",
    svg: processDiagram({
      title: "The Process of Drinking Water Treatment",
      steps: ["River/reservoir intake", "Screening (removes debris)", "Coagulation (add chemicals)", "Sedimentation (solids settle)", "Filtration (sand & gravel)", "Disinfection (chlorine/UV)", "pH adjustment", "Storage reservoir", "Distribution to homes"],
      color: "#0891b2",
      layout: "snake",
    }),
  },

  {
    chartLabel: "Process Diagram",
    question: "The diagram below shows the stages involved in producing cement. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: processDiagram({
      title: "How Cement is Manufactured",
      steps: ["Limestone & clay quarried", "Crushed into powder", "Mixed in correct ratio", "Heated in rotating kiln (1450°C)", "Clinker formed & cooled", "Ground with gypsum", "Cement powder packaged", "Delivered to construction sites"],
      color: "#ca8a04",
      layout: "snake",
    }),
  },

  {
    chartLabel: "Process Diagram",
    question: "The diagram below shows the life cycle of a glass bottle from manufacture to recycling. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: processDiagram({
      title: "Life Cycle of a Glass Bottle",
      steps: ["Sand, soda ash & limestone mined", "Raw materials melted (1700°C)", "Molten glass blown into mould", "Cooled & quality checked", "Filled & labelled", "Sold to consumer", "Emptied & placed in recycling bin", "Collected & transported to plant", "Crushed (cullet)", "Melted & remoulded"],
      color: "#16a34a",
      layout: "snake",
    }),
  },

  {
    chartLabel: "Process Diagram",
    question: "The diagram below illustrates how electricity is generated by a coal-fired power station. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: processDiagram({
      title: "Electricity Generation in a Coal-Fired Power Station",
      steps: ["Coal mined & delivered", "Crushed into fine powder", "Burned in furnace", "Water heated → steam", "Steam drives turbine", "Turbine drives generator", "Electricity produced", "Step-up transformer", "National grid distribution"],
      color: "#374151",
      layout: "snake",
    }),
  },

  {
    chartLabel: "Process Diagram",
    question: "The diagram below shows the stages in the production of chocolate from cacao beans to the finished product. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: processDiagram({
      title: "How Chocolate is Made from Cacao Beans",
      steps: ["Cacao pods harvested", "Beans fermented (5–7 days)", "Dried in sun", "Roasted (120–150°C)", "Shelled (cacao nibs)", "Ground into chocolate liquor", "Cocoa butter separated", "Mixed with sugar & milk", "Conched (smoothed)", "Tempered & moulded", "Cooled & packaged"],
      color: "#92400e",
      layout: "snake",
    }),
  },

  {
    chartLabel: "Process Diagram",
    question: "The diagram below shows how solar panels generate and supply electricity to a home. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: processDiagram({
      title: "How a Solar Panel System Generates Electricity",
      steps: ["Sunlight hits solar panels", "Photovoltaic cells absorb light", "DC electricity generated", "Inverter converts DC to AC", "Powers home appliances", "Excess stored in battery", "Surplus exported to grid", "Credit earned on energy bill"],
      color: "#f59e0b",
    }),
  },

  // ═══════════════════════════════════════════
  //  MIXED / ADDITIONAL CHARTS  (7)
  // ═══════════════════════════════════════════

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the number of Olympic gold medals won by the top eight countries at the 2020 Tokyo Summer Olympic Games. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Gold Medals Won at the 2020 Tokyo Olympic Games",
      sub: "Top 8 countries",
      labels: ["USA","China","GB","ROC","Australia","Japan","Germany","Netherlands"],
      data: [39, 38, 22, 20, 17, 27, 10, 10],
      yMax: 45,
      color: "#ca8a04",
    }),
  },

  {
    chartLabel: "Grouped Bar Chart",
    question: "The chart below shows the percentage of 18–24 year olds and 55–64 year olds using various social media platforms in the UK in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "Social Media Use by Age Group in the UK, 2022 (%)",
      groups: ["YouTube","Facebook","Instagram","TikTok","Twitter","LinkedIn"],
      yMax: 95, yUnit: "%",
      series: [
        { name: "18–24 year olds", data: [91, 62, 78, 67, 43, 32] },
        { name: "55–64 year olds", data: [57, 73, 28,  7, 19, 31] },
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the percentage of the population in the UK who used online banking between 2007 and 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Online Banking Usage in the UK",
      sub: "Percentage of population, 2007–2022",
      xLabels: ["2007","2009","2011","2013","2015","2017","2019","2021","2022"],
      yMin: 0, yMax: 80, yUnit: "%",
      series: [
        { name: "Used online banking in past year", data: [30, 38, 45, 52, 57, 63, 68, 74, 76] },
      ],
    }),
  },

  {
    chartLabel: "Bar Chart",
    question: "The bar chart below shows the average cost of a one-bedroom apartment (monthly rent in USD) in ten major cities worldwide in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: barChart({
      title: "Average Monthly Rent for a 1-Bedroom Apartment",
      sub: "Major cities, USD per month, 2023",
      labels: ["San Francisco","New York","London","Zurich","Singapore","Sydney","Paris","Berlin","Dubai","Seoul"],
      data: [3200, 2900, 2400, 2200, 2100, 1900, 1700, 1300, 1600, 1100],
      yMax: 3600, yUnit: "$",
      color: "#7c3aed",
    }),
  },

  {
    chartLabel: "Grouped Bar Chart",
    question: "The chart below compares the percentage of people travelling to work by car, public transport, cycling and on foot in three cities in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: groupedBar({
      title: "Commuter Transport Mode Share (%)",
      sub: "Amsterdam, London and Los Angeles, 2020",
      groups: ["Amsterdam","London","Los Angeles"],
      yMax: 80, yUnit: "%",
      series: [
        { name: "Car",             data: [19, 27, 71] },
        { name: "Public transport",data: [28, 45, 12] },
        { name: "Cycling",         data: [38,  4,  1] },
        { name: "Walking",         data: [15, 24, 16] },
      ],
    }),
  },

  {
    chartLabel: "Table",
    question: "The table below shows data about the most spoken languages in the world in terms of total speakers (native and second-language) in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: dataTable({
      title: "Most Spoken Languages in the World, 2023",
      headers: ["Language", "Native speakers\n(millions)", "Total speakers\n(millions)", "Number of\ncountries", "Official in\nUN?"],
      rows: [
        ["English",  380, 1460, 67, "Yes"],
        ["Mandarin", 920, 1120, 5,  "Yes"],
        ["Hindi",    600,  700, 4,  "Yes"],
        ["Spanish",  485,  576, 21, "Yes"],
        ["French",   80,   309, 29, "Yes"],
        ["Arabic",   310,  422, 25, "Yes"],
      ],
    }),
  },

  {
    chartLabel: "Line Graph",
    question: "The graph below shows the number of scientific research papers published annually in three countries between 2000 and 2020 (in thousands). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    svg: lineGraph({
      title: "Scientific Research Papers Published Annually",
      sub: "USA, China and India (thousands), 2000–2020",
      xLabels: ["2000","2002","2004","2006","2008","2010","2012","2014","2016","2018","2020"],
      yMin: 0, yMax: 700, yUnit: "k",
      series: [
        { name: "USA",   data: [245, 260, 275, 280, 295, 310, 330, 345, 360, 375, 390] },
        { name: "China", data: [40,  65,  95, 140, 185, 250, 325, 400, 470, 540, 630] },
        { name: "India", data: [20,  26,  34,  42,  55,  70,  90, 110, 130, 155, 175] },
      ],
    }),
  },

];
