# ws-tiles-chart
## Tile

**Extends Component**

This class describes a Preact/React component which renders a single tile

**Properties**

-   `props` **[Object][1]** React properties object
    -   `props.identifier` **[Object][1]** identifier of the tile
    -   `props.config` **[Object][1]** Defines the background color of the tile
    -   `props.groupName` **[Object][1]** The class of the tile which can also be used for color styling
    -   `props.size` **[number][2]** Defines the width and height of the tile
    -   `props.onClick` **func** function(groupName,identifier,element) that is called when a tile is clicked

### render

Renders the chart

Returns **[Object][1]** 

### propTypes

Type: [Object][1]

### defaultProps

Type: [Object][1]

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
## WSTilesChart

This class describes a Preact/React component which renders a tiles chart

**Properties**

-   `props` **[Object][1]** React properties object
    -   `props.data` **[Object][1]** Defines the Groups of tiles that should be shown in the chart
    -   `props.config` **[Object][1]** Defines the color of each group of tiles
    -   `props.title` **[string][2]** Title of the chart
    -   `props.maxTileSize` **[number][3]** Defines the maximum size that the tile can be (in pixels)
    -   `props.minTileSize` **[number][3]** Defines the minimum size that the tile can be (in pixels)
    -   `props.width` **[number][3]** Defines width of the chart (in pixels)
    -   `props.height` **[number][3]** Defines height of the chart (in pixels)
    -   `props.onMouseEnter` **func** Defines function that is called for onMouseEnter event
    -   `props.onMouseLeave` **func** Defines function that is called for onMouseLeave event
    -   `props.onClick` **func** Defines function that is called for onCLick event

### componentWillMount

Called before the component mounts to calculate the tiles size

Returns **void** 

### componentWillReceiveProps

Called when the props updates to calculate the tiles size

**Parameters**

-   `nextProps` **[Object][1]** next props received

Returns **void** 

### getTileSize

Returns the size to be used for the tile

**Parameters**

-   `props` **[Object][1]** props of the component

Returns **[number][3]** 

### calculateMaximumPossibleTileSize

Calculates the maximum tile size based on total width, height and amount of tiles

**Parameters**

-   `width` **[number][3]** of the container
-   `height` **[number][3]** of the container
-   `tilesAmount` **[number][3]** total number of tiles in the chart

Returns **[number][3]** 

### render

Renders the chart

Returns **[Object][1]** 

### defaultProps

Type: [Object][1]

### propTypes

Type: [Object][1]

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
