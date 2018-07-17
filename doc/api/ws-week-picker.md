# ws-week-picker
## months

Quick array of all month abbreviations

## allMonths

Quick array of all month shown. There are two from the last year and two from the next year.

## WSWeekPickerCalendar

**Properties**

-   `props` **[Object][1]** properties
    -   `props.selectedYear` **[number][2]** set a preselected year
    -   `props.selectedWeek` **[number][2]** set a preselected week
    -   `props.onChange` **[function][3]** handler which notifies about picked week

### prevYear

Show the previous year.

Returns **void** 

### nextYear

Show the next year.

Returns **void** 

### isActive

Checks if a week is selected and therefor equals the input properties.

**Parameters**

-   `year` **[number][2]** Year of the week
-   `week` **[number][2]** Week

Returns **[boolean][4]** 

### isToday

Checks if a week is the current week.

**Parameters**

-   `year` **[number][2]** Year of the week
-   `week` **[number][2]** Week

Returns **[boolean][4]** 

### buildWeekRows

Builds an array of rows for the calendar. Every row holds one or none week of the month referenced by the column.

Returns **[Object][1]** 

### render

Renders the calendar.

Returns **[Object][1]** virtual dom

## getDateOfISOWeek

Calculate a date from a week and its year. Date is based on the monday of that week.
src: [http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number][5]

**Parameters**

-   `week` **[number][2]** Week
-   `year` **[number][2]** Year of the week

Returns **[Date][6]** 

## getWeekOfYear

Calculate a week number from a date. Weeks are starting on Monday.
src: [https://gist.github.com/dblock/1081513][7]

**Parameters**

-   `date` **[Date][6]** Date

Returns **[number][2]** 

## getWeeks

Calculate all weeks that are in a certain month.

**Parameters**

-   `month` **[number][2]** Month to get weeks for
-   `year` **[number][2]** Year of the week

Returns **[Array][8]&lt;{week: [number][2], year: [number][2]}>** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[5]: http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date

[7]: https://gist.github.com/dblock/1081513

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
## WSWeekPicker

**Properties**

-   `props` **[Object][1]** properties
    -   `props.selectedYear` **[number][2]** set a preselected year
    -   `props.selectedWeek` **[number][2]** set a preselected week
    -   `props.onChange` **[function][3]** handler which notifies about picked week

### componentDidMount

Initialize a listener to clicks outside of the calender to close it.

Returns **void** 

### componentWillReceiveProps

Updates the internal state of the component if properties change.

**Parameters**

-   `newProps` **[Object][1]** React properties

Returns **void** 

### componentWillUnmount

Removes the click outside listener on deletion of this component.

Returns **void** 

### onChange

Handler for new selections on the calendar

**Parameters**

-   `selection` **[Object][1]** Selected week
    -   `selection.week` **[string][4]** clicked on week
    -   `selection.year` **[string][4]** clicked on year

Returns **void** 

### toggleCalendar

Open or closes the calendar.

Returns **void** 

### render

Renders the input and the calendar.

Returns **[Object][1]** virtual dom

## isDescendant

Check if a child element is descendant of a parent element

**Parameters**

-   `parent` **[Element][5]** parent element
-   `child` **[Element][5]** child element

Returns **[boolean][6]** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[5]: https://developer.mozilla.org/docs/Web/API/Element

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
