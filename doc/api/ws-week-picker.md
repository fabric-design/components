# ws-week-picker
## months

Quick array of all month abbreviations

## allMonths

Quick array of all month shown. There are two from the last year and two from the next year.

## WSWeekPickerCalendar

**Extends Component**

**Parameters**

-   `props`  

**Properties**

-   `props` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** properties
    -   `props.selectedYear` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a preselected year
    -   `props.selectedWeek` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a preselected week
    -   `props.minYear` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a minimum year
    -   `props.minWeek` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a minimum week
    -   `props.maxYear` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a maximum year
    -   `props.maxWeek` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a maximum week
    -   `props.onChange` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** handler which notifies about picked week

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties

### prevYear

Show the previous year.

Returns **void** 

### nextYear

Show the next year.

Returns **void** 

### isActive

Checks if a week is selected and therefor equals the input properties.

**Parameters**

-   `year` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Year of the week
-   `week` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Week

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### isToday

Checks if a week is the current week.

**Parameters**

-   `year` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Year of the week
-   `week` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Week

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### isInTimeframe

Checks if a week is in the required timeframe.

**Parameters**

-   `year` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Year of the week
-   `week` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Week

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### buildWeekRows

Builds an array of rows for the calendar. Every row holds one or none week of the month referenced by the column.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### render

Renders the calendar.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** virtual dom

## getDateOfISOWeek

Calculate a date from a week and its year. Date is based on the monday of that week.
src: <http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number>

**Parameters**

-   `week` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Week
-   `year` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Year of the week

Returns **[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)** 

## getWeekOfYear

Calculate a week number from a date. Weeks are starting on Monday.
src: <https://gist.github.com/dblock/1081513>

**Parameters**

-   `date` **[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)** Date

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

## getWeeks

Calculate all weeks that are in a certain month.

**Parameters**

-   `month` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Month to get weeks for
-   `year` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Year of the week

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;{week: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), year: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)}>** 
## WSWeekPicker

**Extends Component**

**Parameters**

-   `props`  

**Properties**

-   `props` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** properties
    -   `props.selectedYear` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a preselected year
    -   `props.selectedWeek` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a preselected week
    -   `props.minYear` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a minimum year
    -   `props.minWeek` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a minimum week
    -   `props.maxYear` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a maximum year
    -   `props.maxWeek` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** set a maximum week
    -   `props.onChange` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** handler which notifies about picked week

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties

### componentDidMount

Initialize a listener to clicks outside of the calender to close it.

Returns **void** 

### componentWillReceiveProps

Updates the internal state of the component if properties change.

**Parameters**

-   `newProps` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties

Returns **void** 

### componentWillUnmount

Removes the click outside listener on deletion of this component.

Returns **void** 

### onChange

Handler for new selections on the calendar

**Parameters**

-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$0.week`  
    -   `$0.year`  
-   `week` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** clicked on week
-   `year` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** clicked on year

Returns **void** 

### toggleCalendar

Open or closes the calendar.

Returns **void** 

### render

Renders the input and the calendar.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** virtual dom

## isDescendant

Check if a child element is descendant of a parent element

**Parameters**

-   `parent` **[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)** parent element
-   `child` **[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)** child element

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
