function homescreen(){
    const margin = {top: 70, right: 80, bottom: 40, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const type = d3.annotationXYThreshold;

    const x = d3.scaleTime()
        .range([0,width]);

    const y = d3.scaleLinear()
        .range([height,0]);

    const svg = d3.select("#chart-container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    //const tooltip = d3.select("#tooltip");
            d3.csv("weekly-covid-cases.csv").then(data => {

                data = data.filter(d => d.Entity === 'World excl. China').map(d => {
                    return {
                        date: new Date(d.Day),
                        weekly_cases: +d['Weekly cases']
                    };
                });
                data = data.filter(d => d.date.getDay() === 1);

                x.domain(d3.extent(data, d => d.date));
                y.domain([0, d3.max(data, d => d.weekly_cases)]);

                // Add x-axis
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x)
                        .ticks(d3.timeMonth.every(3))
                        .tickFormat(d3.timeFormat("%b %Y")));

                // Add y-axis
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Define the line generator for weekly cases
                const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.weekly_cases));

                // Draw the line for weekly cases
                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", -margin.top / 2)
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .text("Global Weekly COVID-19 Cases and Deaths");

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Date");

                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left)
                    .attr("x", -height / 2)
                    .attr("fill", "steelblue")
                    .attr("dy", "1em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Number of New Cases");
                

                d3.csv("weekly-covid-deaths.csv").then(death_data => {
                    // Parse date and value, and filter to include only world entity and start of the week (Monday)
                    death_data = death_data.filter(d => d.Entity === 'World excl. China').map(d => {
                        return {
                            date: new Date(d.Day),
                            weekly_deaths: +d['Weekly deaths']
                        };
                    });
                    death_data = death_data.filter(d => d.date.getDay() === 1);
                    y.domain([0, d3.max(death_data, d => d.weekly_deaths)]);

                    svg.append("g")
                        .attr("transform", `translate(${width},0)`)
                        .call(d3.axisRight(y));

                // Define the line generator for weekly cases
                    const death_line = d3.line()
                        .x(d => x(d.date))
                        .y(d => y(d.weekly_deaths));

                    // Draw the line for weekly deaths
                    svg.append("path")
                        .datum(death_data)
                        .attr("fill", "none")
                        .attr("stroke", "orange")
                        .attr("stroke-width", 1.5)
                        .attr("d", death_line);

                //Trial for adding second y-axis
                    svg.append("text")
                        .attr("transform", "rotate(90)")
                        .attr("y", -width-margin.right+15) //is there a better way to do this?
                        .attr("x", height / 2)
                        .attr("dy", "1em")
                        .attr("fill", "orange")
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .text("Number of New Deaths");
            });
        const annotations = [
            {
                note: {
                    label: "Start of Covid-19",
                    wrap: 200
                },
                //1120 is last point on graph for x coordinates
                //80 is the origin x coord and 46 is origin y coordinate
                x: 80, //origin
                y: 460, //origin
                dx: 20,
                dy: -40,
                // subject: {
                //     radius: 20,
                //     radiusPadding: 10
                // }
            },
            {
                note: {
                    label: "WHO Declares End to Public Health Emergency",
                    //title: "COVID-19 Begins",
                    wrap: 200
                },
                //1120 is last point on graph for x coordinates
                //80 is the origin x coord and 46 is origin y coordinate
                x: 857, //origin
                y: 460, //origin
                dx: 20,
                dy: -40,
                // subject: {
                //     radius: 20,
                //     radiusPadding: 10
                // }
            }
        ];
        const makeAnnotations = d3.annotation()
            .notePadding(5)
            .type(d3.annotationXYThreshold)
            .annotations(annotations)
        d3.select("svg")
            .append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations)
        });
}

function screenOne(){
    const margin = {top: 70, right: 80, bottom: 40, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const type = d3.annotationXYThreshold;

    const x = d3.scaleTime()
        .range([0,width]);

    const y = d3.scaleLinear()
        .range([height,0]);

    const svg = d3.select("#chart-container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

            d3.csv("weekly-covid-cases.csv").then(first_year_data => {

                first_year_data = first_year_data.filter(d => d.Entity === 'World excl. China').map(d => {
                    return {
                        date: new Date(d.Day),
                        weekly_cases: +d['Weekly cases']
                    };
                });

                first_year_data = first_year_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() === 2020);

                x.domain(d3.extent(first_year_data, d => d.date));
                y.domain([0, d3.max(first_year_data, d => d.weekly_cases)]);

                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x)
                        .ticks(d3.timeMonth.every(1))
                        .tickFormat(d3.timeFormat("%b %Y")));

                svg.append("g")
                    .call(d3.axisLeft(y));

                // Define the line generator for weekly cases
                const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.weekly_cases));

                // Draw the line for weekly cases
                svg.append("path")
                    .datum(first_year_data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", -margin.top / 2)
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .text("2020 Global Weekly COVID-19 Cases and Deaths");

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Date");

                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left)
                    .attr("x", -height / 2)
                    .attr("fill", "steelblue")
                    .attr("dy", "1em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Number of New Cases");

                d3.csv("weekly-covid-deaths.csv").then(death_data => {
                    death_data = death_data.filter(d => d.Entity === 'World excl. China').map(d => {
                        return {
                            date: new Date(d.Day),
                            weekly_deaths: +d['Weekly deaths']
                        };
                    });
                    death_data = death_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() == 2020);
                    y.domain([0, d3.max(death_data, d => d.weekly_deaths)]);

                    svg.append("g")
                        .attr("transform", `translate(${width},0)`)
                        .call(d3.axisRight(y));

                // Define the line generator for weekly cases
                    const death_line = d3.line()
                        .x(d => x(d.date))
                        .y(d => y(d.weekly_deaths));

                    // Draw the line for weekly cases
                    svg.append("path")
                        .datum(death_data)
                        .attr("fill", "none")
                        .attr("stroke", "orange")
                        .attr("stroke-width", 1.5)
                        .attr("d", death_line);

                //Trial for adding second y-axis
                    svg.append("text")
                        .attr("transform", "rotate(90)")
                        .attr("y", -width-margin.right+15) //is there a better way to do this?
                        .attr("x", height / 2)
                        .attr("dy", "1em")
                        .attr("fill", "orange")
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .text("Number of New Deaths");
                });
                const annotations = [
                    {
                        note: {
                            label: "January 20, 2020: First case of COVID-19 in the US",
                            //title: "COVID-19 Begins",
                            wrap: 100
                        },
                        x: 120, //origin
                        y: 460, //origin
                        dx: 0,
                        dy: -40,
                        // subject: {
                        //     radius: 20,
                        //     radiusPadding: 10
                        // }
                    },
                    {
                        note: {
                            label: "March 11, 2020: WHO declares COVID-19 a Global Pandemic",
                            //title: "COVID-19 Begins",
                            wrap: 100
                        },
                        x: 250,
                        y: 460,
                        dx: -1,
                        dy: -120,
                        // subject: {
                        //     radius: 20,
                        //     radiusPadding: 10
                        // }
                    },
                    {
                        note: {
                            label: "March 17, 2020: Moderna Therapeutics begin first human trials of the vaccine",
                            wrap: 100
                        },
                        x: 275,
                        y: 460,
                        dx: -1,
                        dy: -200,
                    },
                    // {
                    //     note: {
                    //         label: "April 3, 2020: CDC advises the use of cloth face coverings in public",
                    //         wrap: 100
                    //     },
                    //     x: 325,
                    //     y: 460,
                    //     dx: 0,
                    //     dy: -120,
                    // },
                    {
                        note: {
                            label: "April 13, 2020: Most states in the U.S report widespread cases and deaths from COVID-19, marking the first wave",
                            wrap: 100
                        },
                        x: 350,
                        y: 415,
                        dx: 0,
                        dy: -180,
                    },
                    {
                        note: {
                            label: "May 1, 2020: FDA issues EUA for the use of antiviral drug Remdesivir for severe cases",
                            wrap: 100
                        },
                        x: 405,
                        y: 460,
                        dx: 0,
                        dy: -40,
                    },
                    {
                        note: {
                            label: "June 8, 2020: World Bank states the pandemic will pluge global economy into the worst recession since WW2",
                            wrap: 100
                        },
                        x: 510,
                        y: 460,
                        dx: 0,
                        dy: -180,
                    },
                    {
                        note: {
                            label: "August 14, 2020: CDC issues a moratorium on evictions",
                            wrap: 100
                        },
                        x: 715,
                        y: 460,
                        dx: 0,
                        dy: -85,
                    },
                    {
                        note: {
                            label: "August 24, 2020: First documented case of reinfection reported in Hong Kong",
                            wrap: 100
                        },
                        x: 750,
                        y: 303,
                        dx: 0,
                        dy: -85,
                    },
                    {
                        note: {
                            label: "September 28, 2020: Reported worldwide death toll from COVID-19 surpasses 1 million",
                            wrap: 100
                        },
                        x: 850,
                        y: 289,
                        dx: 0,
                        dy: 85,
                    },
                    {
                        note: {
                            label: "November 13, 2020: Two weeks after Halloween celebrations, COVID-19 case numbers spike",
                            wrap: 100
                        },
                        x: 980,
                        y: 124,
                        dx: 0,
                        dy: 85,
                    },
                    {
                        note: {
                            label: "December 11-18, 2020: FDA issues EUA for Pfizer-BioNTech & Moderna vaccine",
                            wrap: 100
                        },
                        x: 1080,
                        y: 460,
                        dx: -0.01,
                        dy: -10,
                    },
                ];
                const makeAnnotations = d3.annotation()
                    .type(d3.annotationXYThreshold)
                    .annotations(annotations)
                d3.select("svg")
                    .append("g")
                    .attr("class", "annotation-group")
                    .style("font-size", "12px")
                    .call(makeAnnotations);
                // d3.selectAll(".annotation-note")
                // .selectAll("text")
                // .attr("class", "annotation-label");
            });
            
}


function screenTwo(){
    const margin = {top: 70, right: 80, bottom: 40, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const type = d3.annotationXYThreshold;

    const x = d3.scaleTime()
        .range([0,width]);

    const y = d3.scaleLinear()
        .range([height,0]);

    const svg = d3.select("#chart-container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

            d3.csv("weekly-covid-cases.csv").then(second_year_data => {

                second_year_data = second_year_data.filter(d => d.Entity === 'World excl. China').map(d => {
                    return {
                        date: new Date(d.Day),
                        weekly_cases: +d['Weekly cases']
                    };
                });

                second_year_data = second_year_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() === 2021);

                x.domain(d3.extent(second_year_data, d => d.date));
                y.domain([0, d3.max(second_year_data, d => d.weekly_cases)]);

                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x)
                        .ticks(d3.timeMonth.every(1))
                        .tickFormat(d3.timeFormat("%b %Y")));

                svg.append("g")
                    .call(d3.axisLeft(y));

                // Define the line generator for weekly cases
                const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.weekly_cases));

                // Draw the line for weekly cases
                svg.append("path")
                    .datum(second_year_data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", -margin.top / 2)
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .text("2021 Global Weekly COVID-19 Cases and Deaths");

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Date");

                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left)
                    .attr("x", -height / 2)
                    .attr("fill", "steelblue")
                    .attr("dy", "1em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Number of New Cases");


                d3.csv("weekly-covid-deaths.csv").then(death_data => {

                    death_data = death_data.filter(d => d.Entity === 'World excl. China').map(d => {
                        return {
                            date: new Date(d.Day),
                            weekly_deaths: +d['Weekly deaths']
                        };
                    });
                    death_data = death_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() == 2021);
                    y.domain([0, d3.max(death_data, d => d.weekly_deaths)]);

                    svg.append("g")
                        .attr("transform", `translate(${width},0)`)
                        .call(d3.axisRight(y));

                // Define the line generator for weekly cases
                    const death_line = d3.line()
                        .x(d => x(d.date))
                        .y(d => y(d.weekly_deaths));

                    // Draw the line for weekly cases
                    svg.append("path")
                        .datum(death_data)
                        .attr("fill", "none")
                        .attr("stroke", "orange")
                        .attr("stroke-width", 1.5)
                        .attr("d", death_line);

                //Trial for adding second y-axis
                    svg.append("text")
                        .attr("transform", "rotate(90)")
                        .attr("y", -width-margin.right+15) //is there a better way to do this?
                        .attr("x", height / 2)
                        .attr("dy", "1em")
                        .attr("fill", "orange")
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .text("Number of New Deaths");
                });
                const annotations = [
                    {
                        note: {
                            label: "January 26, 2021: Cases worldwide surpass 100 million",
                            wrap: 100
                        },
                        x: 150,
                        y: 203,
                        dx: 0,
                        dy: -5,
                    },
                    {
                        note: {
                            label: "March 14, 2021: Some countries suspend distribution of AstraZeneca's vaccine due to concern with blood clots",
                            wrap: 100
                        },
                        x: 285,
                        y: 460,
                        dx: 0,
                        dy: -20,
                    },
                    {
                        note: {
                            label: "April 26, 2021: India reports a record daily rise in COVID-19 cases",
                            wrap: 100
                        },
                        x: 410,
                        y: 95,
                        dx: -1,
                        dy: 120,
                    },
                    {
                        note: {
                            label: "May 10, 2021: Cases worldwide surpass 160 million",
                            wrap: 100
                        },
                        x: 450,
                        y: 115,
                        dx: 1,
                        dy: 180,
                    },
                    {
                        note: {
                            label: "July 27, 2021: Delta variant surge",
                            wrap: 100
                        },
                        x: 672,
                        y: 220,
                        dx: -1,
                        dy: -30,
                    },
                    {
                        note: {
                            label: "August 12, 2021: Delta variant becomes the dominant strain globally",
                            wrap: 100
                        },
                        x: 710,
                        y: 460,
                        dx: -1,
                        dy: -30,
                    },
                    {
                        note: {
                            label: "September 24, 2021: UN General Assembly addresses the global response to COVID-19 pandemic",
                            wrap: 100
                        },
                        x: 845,
                        y: 460,
                        dx: -1,
                        dy: -30,
                    },
                    {
                        note: {
                            label: "September 30, 2021: Global cases surpass 234 million; deaths exceed 4.8 million",
                            wrap: 100
                        },
                        x: 864,
                        y: 257,
                        dx: 0,
                        dy: -50,
                    },
                    { //BLUE IS CASES, ORANGE IS DEATHS
                        note: {
                            label: "November 26, 2021: WHO identifies Omicron variant as a concern",
                            wrap: 100
                        },
                        x: 1033,
                        y: 460,
                        dx: -1,
                        dy: -30,
                    },
                    {
                        note: {
                            label: "December 20, 2021: Serveral countries report a surge in Omicron cases",
                            wrap: 100
                        },
                        x: 1105,
                        y: 135,
                        dx: -1,
                        dy: -30,
                    },
                ];
                const makeAnnotations = d3.annotation()
                    .type(d3.annotationXYThreshold)
                    .annotations(annotations)
                d3.select("svg")
                    .append("g")
                    .attr("class", "annotation-group")
                    .style("font-size", "12px")
                    .call(makeAnnotations);

            });
}



function screenThree(){
    const margin = {top: 70, right: 80, bottom: 40, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const type = d3.annotationXYThreshold;
    const x = d3.scaleTime()
        .range([0,width]);

    const y = d3.scaleLinear()
        .range([height,0]);

    const svg = d3.select("#chart-container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

            d3.csv("weekly-covid-cases.csv").then(third_year_data => {

                third_year_data = third_year_data.filter(d => d.Entity === 'World excl. China').map(d => {
                    return {
                        date: new Date(d.Day),
                        weekly_cases: +d['Weekly cases']
                    };
                });

                third_year_data = third_year_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() === 2022);

                x.domain(d3.extent(third_year_data, d => d.date));
                y.domain([0, d3.max(third_year_data, d => d.weekly_cases)]);

                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x)
                        .ticks(d3.timeMonth.every(1))
                        .tickFormat(d3.timeFormat("%b %Y")));

                svg.append("g")
                    .call(d3.axisLeft(y));

                // Define the line generator for weekly cases
                const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.weekly_cases));

                // Draw the line for weekly cases
                svg.append("path")
                    .datum(third_year_data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", -margin.top / 2)
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .text("2022 Global Weekly COVID-19 Cases and Deaths");

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Date");

                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left)
                    .attr("x", -height / 2)
                    .attr("fill", "steelblue")
                    .attr("dy", "1em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Number of New Cases");

                d3.csv("weekly-covid-deaths.csv").then(death_data => {
                    death_data = death_data.filter(d => d.Entity === 'World excl. China').map(d => {
                        return {
                            date: new Date(d.Day),
                            weekly_deaths: +d['Weekly deaths']
                        };
                    });
                    death_data = death_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() == 2022);
                    y.domain([0, d3.max(death_data, d => d.weekly_deaths)]);

                    svg.append("g")
                        .attr("transform", `translate(${width},0)`)
                        .call(d3.axisRight(y));

                // Define the line generator for weekly cases
                    const death_line = d3.line()
                        .x(d => x(d.date))
                        .y(d => y(d.weekly_deaths));

                    // Draw the line for weekly cases
                    svg.append("path")
                        .datum(death_data)
                        .attr("fill", "none")
                        .attr("stroke", "orange")
                        .attr("stroke-width", 1.5)
                        .attr("d", death_line);

                //Trial for adding second y-axis
                    svg.append("text")
                        .attr("transform", "rotate(90)")
                        .attr("y", -width-margin.right+15) //is there a better way to do this?
                        .attr("x", height / 2)
                        .attr("dy", "1em")
                        .attr("fill", "orange")
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .text("Number of New Deaths");
                });
                const annotations = [
                    {
                        note: {
                            label: "January 10, 2022: WHO reports that the Omicron variant has led to record numbers of cases and deaths worldwide",
                            wrap: 100
                        },
                        x: 105,
                        y: 171,
                        dx: 0,
                        dy: 50,
                    },
                    {
                        note: {
                            label: "January 31, 2022: Omicron variant wave of COVID-19",
                            wrap: 100
                        },
                        x: 162,
                        y: 113,
                        dx: 0,
                        dy: -50,
                    },
                    {
                        note: {
                            label: "February 24, 2022: WHO announces that over 10 billion COVID-19 vaacine doses have been administered globally",
                            wrap: 100
                        },
                        x: 235,
                        y: 460,
                        dx: 0,
                        dy: -30,
                    },
                    {
                        note: {
                            label: "April 29, 2022: Cases exceed 510 million worldwide; the death toll reaches 6.2 million",
                            wrap: 100
                        },
                        x: 410,
                        y: 385,
                        dx: 0,
                        dy: -30,
                    },
                    {
                        note: {
                            label: "June 30, 2022: COVID-19 case numbers rise across the U.S due to Omicron subvariants BA.4 and BA.5",
                            wrap: 100
                        },
                        x: 512,
                        y: 414,
                        dx: 0,
                        dy: -90,
                    },
                    {
                        note: {
                            label: "August 30, 2022: Omicron subvariants BA.4 and BA.5 surge",
                            wrap: 100
                        },
                        x: 689,
                        y: 344,
                        dx: 0,
                        dy: -20,
                    },
                    {
                        note: {
                            label: "October 20, 2022: Global number of COVID-19 cases surpasses 600 million",
                            wrap: 100
                        },
                        x: 930,
                        y: 415,
                        dx: -1,
                        dy: -20,
                    },
                    {
                        note: {
                            label: "December 15, 2022: Global vaccination coverage has reached 70%",
                            wrap: 100
                        },
                        x: 1080,
                        y: 460,
                        dx: -0.1,
                        dy: -70,
                    },
                ];
                const makeAnnotations = d3.annotation()
                .type(d3.annotationXYThreshold)
                .annotations(annotations)
            d3.select("svg")
                .append("g")
                .attr("class", "annotation-group")
                .style("font-size", "12px")
                .call(makeAnnotations);

            });
}


function screenFour(){
    const margin = {top: 70, right: 80, bottom: 40, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleTime()
        .range([0,width]);

    const y = d3.scaleLinear()
        .range([height,0]);

    const svg = d3.select("#chart-container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

            d3.csv("weekly-covid-cases.csv").then(fourth_year_data => {

                fourth_year_data = fourth_year_data.filter(d => d.Entity === 'World excl. China').map(d => {
                    return {
                        date: new Date(d.Day),
                        weekly_cases: +d['Weekly cases']
                    };
                });

                fourth_year_data = fourth_year_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() === 2023);

                x.domain(d3.extent(fourth_year_data, d => d.date));
                y.domain([0, d3.max(fourth_year_data, d => d.weekly_cases)]);

                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x)
                        .ticks(d3.timeMonth.every(1))
                        .tickFormat(d3.timeFormat("%b %Y")));

                svg.append("g")
                    .call(d3.axisLeft(y));

                // Define the line generator for weekly cases
                const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.weekly_cases));

                // Draw the line for weekly cases
                svg.append("path")
                    .datum(fourth_year_data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", -margin.top / 2)
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .text("2023 Global Weekly COVID-19 Cases and Deaths");

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Date");

                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left)
                    .attr("x", -height / 2)
                    .attr("fill", "steelblue")
                    .attr("dy", "1em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Number of New Cases");


                d3.csv("weekly-covid-deaths.csv").then(death_data => {
                    death_data = death_data.filter(d => d.Entity === 'World excl. China').map(d => {
                        return {
                            date: new Date(d.Day),
                            weekly_deaths: +d['Weekly deaths']
                        };
                    });
                    death_data = death_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() == 2023);
                    y.domain([0, d3.max(death_data, d => d.weekly_deaths)]);

                    svg.append("g")
                        .attr("transform", `translate(${width},0)`)
                        .call(d3.axisRight(y));

                // Define the line generator for weekly cases
                    const death_line = d3.line()
                        .x(d => x(d.date))
                        .y(d => y(d.weekly_deaths));

                    // Draw the line for weekly cases
                    svg.append("path")
                        .datum(death_data)
                        .attr("fill", "none")
                        .attr("stroke", "orange")
                        .attr("stroke-width", 1.5)
                        .attr("d", death_line);

                //Trial for adding second y-axis
                    svg.append("text")
                        .attr("transform", "rotate(90)")
                        .attr("y", -width-margin.right+15) //is there a better way to do this?
                        .attr("x", height / 2)
                        .attr("dy", "1em")
                        .attr("fill", "orange")
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .text("Number of New Deaths");
                });
                const annotations = [
                    {
                        note: {
                            label: "February 10, 2023: Spike in deaths is due to countries in Asia reporting past couple weeks cumulative deaths",
                            wrap: 100
                        },
                        x: 182,
                        y: 75,
                        dx: 10,
                        dy: 10,
                    },
                    {
                        note: {
                            label: "March 11, 2023: Three-year anniversary of pandemic declaration",
                            wrap: 100
                        },
                        x: 265,
                        y: 460,
                        dx: 0,
                        dy: -10,
                    },
                    {
                        note: {
                            label: "May 5, 2023: WHO declares an end to the global Public Health Emergency for COVID-19",
                            wrap: 100
                        },
                        x: 435,
                        y: 460,
                        dx: 0,
                        dy: -100,
                    },
                    {
                        note: {
                            label: "June 25, 2023: COVID-19 death toll surpasses 6.5 million",
                            wrap: 100
                        },
                        x: 580,
                        y: 430,
                        dx: 0,
                        dy: -10,
                    },
                    {
                        note: {
                            label: "December 10, 2023: COVID-19 cases and deaths stabilize as global vaccination effors continue",
                            wrap: 100
                        },
                        x: 1070,
                        y: 420,
                        dx: -0.1,
                        dy: -30,
                    },
                ];
                const makeAnnotations = d3.annotation()
                .type(d3.annotationXYThreshold)
                .annotations(annotations)
            d3.select("svg")
                .append("g")
                .attr("class", "annotation-group")
                .style("font-size", "12px")
                .call(makeAnnotations);

            });
}


function screenFive(){
    const margin = {top: 70, right: 80, bottom: 40, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleTime()
        .range([0,width]);

    const y = d3.scaleLinear()
        .range([height,0]);

    const svg = d3.select("#chart-container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

            d3.csv("weekly-covid-cases.csv").then(fifth_year_data => {

                fifth_year_data = fifth_year_data.filter(d => d.Entity === 'World excl. China').map(d => {
                    return {
                        date: new Date(d.Day),
                        weekly_cases: +d['Weekly cases']
                    };
                });

                fifth_year_data = fifth_year_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() === 2024);

                x.domain(d3.extent(fifth_year_data, d => d.date));
                y.domain([0, d3.max(fifth_year_data, d => d.weekly_cases)]);

                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x)
                        .ticks(d3.timeMonth.every(1))
                        .tickFormat(d3.timeFormat("%b %Y")));

                svg.append("g")
                    .call(d3.axisLeft(y));

                // Define the line generator for weekly cases
                const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.weekly_cases));

                // Draw the line for weekly cases
                svg.append("path")
                    .datum(fifth_year_data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", -margin.top / 2)
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .text("2024 Global Weekly COVID-19 Cases and Deaths");

                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Date");

                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left)
                    .attr("x", -height / 2)
                    .attr("fill", "steelblue")
                    .attr("dy", "1em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Number of New Cases");

                d3.csv("weekly-covid-deaths.csv").then(death_data => {
                    death_data = death_data.filter(d => d.Entity === 'World excl. China').map(d => {
                        return {
                            date: new Date(d.Day),
                            weekly_deaths: +d['Weekly deaths']
                        };
                    });
                    death_data = death_data.filter(d => d.date.getDay() === 1 && d.date.getFullYear() == 2024);
                    y.domain([0, d3.max(death_data, d => d.weekly_deaths)]);

                    svg.append("g")
                        .attr("transform", `translate(${width},0)`)
                        .call(d3.axisRight(y));

                // Define the line generator for weekly cases
                    const death_line = d3.line()
                        .x(d => x(d.date))
                        .y(d => y(d.weekly_deaths));

                    // Draw the line for weekly cases
                    svg.append("path")
                        .datum(death_data)
                        .attr("fill", "none")
                        .attr("stroke", "orange")
                        .attr("stroke-width", 1.5)
                        .attr("d", death_line);

                //Trial for adding second y-axis
                    svg.append("text")
                        .attr("transform", "rotate(90)")
                        .attr("y", -width-margin.right+20) //is there a better way to do this?
                        .attr("x", height / 2)
                        .attr("dy", "1em")
                        .attr("fill", "orange")
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .text("Number of New Deaths");
                });

                const annotations = [
                    {
                        note: {
                            label: "March 11, 2024: Four-year anniversary of pandemic declaration",
                            wrap: 100
                        },
                        x: 265,
                        y: 460,
                        dx: 0,
                        dy: -10,
                    },
                    {
                        note: {
                            label: "May 1, 2024: Hospitals are no longer required to report COVID-19 hospital admissions",
                            wrap: 100
                        },
                        x: 856,
                        y: 460,
                        dx: 0,
                        dy: -70,
                    },
                ];
                const makeAnnotations = d3.annotation()
                .type(d3.annotationXYThreshold)
                .annotations(annotations)
            d3.select("svg")
                .append("g")
                .attr("class", "annotation-group")
                .style("font-size", "12px")
                .call(makeAnnotations);
            });
}