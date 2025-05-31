enum Direction {
    Up,
    Down = 5,
    Left,
    Right
}

function doSomething(keyPress: Direction) {
    console.log(keyPress)
}

doSomething(Direction.Up);
doSomething(Direction.Down);
doSomething(Direction.Left);
doSomething(Direction.Right);