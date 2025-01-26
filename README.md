# neokortexcouk

This is the website for the neokortex team in the demoscene. It is hosted at <https://www.neokortex.co.uk>.

## TODOs and possible future enhancements

- **Add measure ASCII/ANSI logic:** We currently set a `lineheight` parameter
  to manually configure the height of each ASCII/ANSI file for ansilove display.
  Can we calculate this automatically?

- **Add partial page loading:** At the moment, each page of the site contains all
  the HTML for the header, footer and navigation menu. This "works" to get the site
  up and running initially but we need to factor these elements out into dedicated
  source files and "build" each page at runtime more intelligently. _(Essentially,
  I didn't want to get too distracted from the task in hand by looking at
  JavaScript SPA technologies and routing engines.. But, now we're at version one,
  it might be worth digging into it a bit more. Perhaps React?)_

## Version History

- v1.0.3.20230820 - **virtuallynojavascriptimprovements**
- v1.0.2.20200315 - **textmodeplus**
- v1.0.1.20191027 - **textmode**
- v1.0.0.20190714 - **a glimmer of hope**
