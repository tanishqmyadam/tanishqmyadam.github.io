function deathScreen(){
    const margin = {top: 70, right: 30, bottom: 40, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleTime()
        .range([0,width]);

    const y = d3.scaleLinear()
        .range([height,0]);

    const svg = d3.select("#death-chart-container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

            d3.csv("weekly-covid-deaths.csv").then(data => {
                // Parse date and value, and filter to include only world entity and start of the week (Monday)
                data = data.filter(d => d.Entity === 'World excl. China').map(d => {
                    return {
                        date: new Date(d.Day),
                        weekly_deaths: +d['Weekly deaths']
                    };
                });

                // Filter the data to keep only the start of the week (e.g., Monday)
                data = data.filter(d => d.date.getDay() === 1);

                // Set domains for scales
                x.domain(d3.extent(data, d => d.date));
                y.domain([0, d3.max(data, d => d.weekly_deaths)]);

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
                    .y(d => y(d.weekly_deaths));

                // Draw the line for weekly cases
                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

                // Add a title
                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", -margin.top / 2)
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .text("Covid-19 Weekly New Deaths (World)");

                // Add x-axis label
                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height + margin.bottom)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Date");

                // Add y-axis label
                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left)
                    .attr("x", -height / 2)
                    .attr("dy", "1em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Number of New Deaths");
            });
}