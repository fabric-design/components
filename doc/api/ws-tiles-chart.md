# ws-tiles-chart
## Tile

**Extends Component**

This class describes a Preact/React component which renders a single tile

**Properties**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties object
    -   `props.identifier` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** identifier of the tile
    -   `props.config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Defines the background color of the tile
    -   `props.groupName` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The class of the tile which can also be used for color styling
    -   `props.size` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Defines the width and height of the tile
    -   `props.onClick` **func** function(groupName,identifier,element) that is called when a tile is clicked

### render

Renders the chart

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### propTypes

### defaultProps
## WSTilesChart

**Extends Component**

This class describes a Preact/React component which renders a tiles chart

**Parameters**

-   `props`  

**Properties**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties object
    -   `props.data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Defines the Groups of tiles that should be shown in the chart
    -   `props.config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Defines the color of each group of tiles
    -   `props.title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Title of the chart
    -   `props.maxTileSize` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Defines the maximum size that the tile can be (in pixels)
    -   `props.minTileSize` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Defines the minimum size that the tile can be (in pixels)
    -   `props.width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Defines width of the chart (in pixels)
    -   `props.height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Defines height of the chart (in pixels)
    -   `props.onMouseEnter` **func** Defines function that is called for onMouseEnter event
    -   `props.onMouseLeave` **func** Defines function that is called for onMouseLeave event
    -   `props.onClick` **func** Defines function that is called for onCLick event

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties

### componentWillMount

Called before the component mounts to calculate the tiles size

Returns **void** 

### componentWillReceiveProps

Called when the props updates to calculate the tiles size

**Parameters**

-   `nextProps` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** next props received

Returns **void** 

### getTileSize

Returns the size to be used for the tile

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** props of the component

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### calculateMaximumPossibleTileSize

Calculates the maximum tile size based on total width, height and amount of tiles

**Parameters**

-   `width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** of the container
-   `height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** of the container
-   `tilesAmount` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** total number of tiles in the chart

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### render

Renders the chart

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### defaultProps

### propTypes
