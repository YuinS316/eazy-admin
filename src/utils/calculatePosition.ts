import { Point, Recordable } from "@/types/typing";
import {
  cos,
  sin,
  getCenterPoint,
  calculateRotatedPoint,
  getDistanceOfTwoPoints
} from "./transition";

type PointInfos = {
  //  中心点
  centerPoint: Point;
  //  刚开始被点击的位置
  currentPoint: Point;
  //  对称点
  symmetricPoint: Point;
  //  移动后鼠标所在中心点
  currentPosition: Point;
};

const calcFunMap = {
  lt: calculateLeftTopPoint,
  rt: calculateRightTopPoint,
  lb: calculateLeftBottomPoint,
  rb: calculateRightBottomPoint,
  t: calculateTopPoint,
  b: calculateBottomPoint,
  l: calculateLeftPoint,
  r: calculateRightPoint
};

type CalcFunName = keyof typeof calcFunMap;

/**
 * 计算拖拽点和拖拽点对角线的相关信息
 * @param point 拖拽点
 * @param symmetricPoint 拖拽点的对角点
 * @param degree 角度
 */
function calcDiagonalPosition(
  point: Point,
  symmetricPoint: Point,
  degree: number
) {
  const newCenterPoint = getCenterPoint(point, symmetricPoint);

  const newPoint = calculateRotatedPoint(point, newCenterPoint, degree);

  const newSymmetricPoint = calculateRotatedPoint(
    symmetricPoint,
    newCenterPoint,
    degree
  );

  const newWidth = Math.abs(newPoint.x - newSymmetricPoint.x);
  const newHeight = Math.abs(newPoint.y - newSymmetricPoint.y);

  return {
    newCenterPoint,
    newPoint,
    newSymmetricPoint,
    newWidth,
    newHeight
  };
}

/**
 * 计算拖拽左上角的情况
 *
 * @param style
 * @param pointInfos
 *
 * @reference 拖动图形顶角手柄时的计算步骤
 * https://github.com/shenhudong/snapping-demo/wiki/corner-handle
 */
function calculateLeftTopPoint(
  style: Recordable,
  pointInfos: PointInfos,
  proportion: number,
  isLockProportion: boolean
) {
  const { symmetricPoint, currentPosition } = pointInfos;

  //  新的中心点
  // let newCenterPoint = getCenterPoint(currentPosition, symmetricPoint);

  //  为什么是负的角度，原因是我们得到的是一个已经旋转过的图形
  //  我们要反着转回去得到未旋转前的图形
  //  再配合已经设定的rotate才是最后的结果
  // let newLeftTopPoint = calculateRotatedPoint(
  //   currentPosition,
  //   newCenterPoint,
  //   -style.rotate
  // );

  // let newRightBottomPoint = calculateRotatedPoint(
  //   symmetricPoint,
  //   newCenterPoint,
  //   -style.rotate
  // );

  // let newWidth = newRightBottomPoint.x - newLeftTopPoint.x;
  // let newHeight = newRightBottomPoint.y - newLeftTopPoint.y;

  let {
    newCenterPoint,
    newPoint: newLeftTopPoint,
    newWidth,
    newHeight
  } = calcDiagonalPosition(currentPosition, symmetricPoint, -style.rotate);

  //  如果锁定宽高比
  if (isLockProportion) {
    if (newWidth / newHeight > proportion) {
      //  截短之后左上角会更靠右
      newLeftTopPoint.x += Math.abs(newWidth - newHeight * proportion);
      newWidth = proportion * newHeight;
    } else {
      newLeftTopPoint.y += Math.abs(newHeight - newWidth / proportion);
      newHeight = proportion / newWidth;
    }

    //  以没有锁定宽高前的中点转回去
    const rotatedLeftTopPoint = calculateRotatedPoint(
      newLeftTopPoint,
      newCenterPoint,
      style.rotate
    );
    //  这时候的 rotatedLeftTopPoint 相当于我们拖拽到左上角的点
    //  再重新跑一次上面的逻辑即可

    const {
      newPoint: leftTopPoint,
      newWidth: width,
      newHeight: height
    } = calcDiagonalPosition(
      rotatedLeftTopPoint,
      symmetricPoint,
      -style.rotate
    );

    newLeftTopPoint = leftTopPoint;
    newWidth = width;
    newHeight = height;
  }

  if (newWidth > 0 && newHeight > 0) {
    style.width = newWidth;
    style.height = newHeight;
    style.left = newLeftTopPoint.x;
    style.top = newLeftTopPoint.y;
  }
}

function calculateRightTopPoint(
  style: Recordable,
  pointInfos: PointInfos,
  proportion: number,
  isLockProportion: boolean
) {
  const { symmetricPoint, currentPosition } = pointInfos;

  let {
    newCenterPoint,
    newSymmetricPoint: newLeftBottomPoint,
    newPoint: newRightTopPoint,
    newWidth,
    newHeight
  } = calcDiagonalPosition(currentPosition, symmetricPoint, -style.rotate);

  let diagonalPoint = newLeftBottomPoint;

  if (isLockProportion) {
    if (newWidth / newHeight > proportion) {
      //  截短之后右上角会更靠左
      newRightTopPoint.x -= Math.abs(newWidth - newHeight * proportion);
      newWidth = proportion * newHeight;
    } else {
      newRightTopPoint.y += Math.abs(newHeight - newWidth / proportion);
      newHeight = proportion / newWidth;
    }

    const rotatedRightTopPoint = calculateRotatedPoint(
      newRightTopPoint,
      newCenterPoint,
      style.rotate
    );

    const {
      newPoint: rightTopPoint,
      newSymmetricPoint: leftBottomPoint,
      newWidth: width,
      newHeight: height
    } = calcDiagonalPosition(
      rotatedRightTopPoint,
      symmetricPoint,
      -style.rotate
    );

    newRightTopPoint = rightTopPoint;
    newWidth = width;
    newHeight = height;

    diagonalPoint = leftBottomPoint;
  }

  if (newWidth > 0 && newHeight > 0) {
    style.width = newWidth;
    style.height = newHeight;
    style.left = diagonalPoint.x;
    style.top = newRightTopPoint.y;
  }
}

function calculateLeftBottomPoint(
  style: Recordable,
  pointInfos: PointInfos,
  proportion: number,
  isLockProportion: boolean
) {
  const { symmetricPoint, currentPosition } = pointInfos;

  let {
    newCenterPoint,
    newSymmetricPoint: newRightTopPoint,
    newPoint: newLeftBottomPoint,
    newWidth,
    newHeight
  } = calcDiagonalPosition(currentPosition, symmetricPoint, -style.rotate);

  let diagonalPoint = newRightTopPoint;

  if (isLockProportion) {
    if (newWidth / newHeight > proportion) {
      //  截短之后右上角会更靠左
      newLeftBottomPoint.x += Math.abs(newWidth - newHeight * proportion);
      newWidth = proportion * newHeight;
    } else {
      newLeftBottomPoint.y -= Math.abs(newHeight - newWidth / proportion);
      newHeight = proportion / newWidth;
    }

    const rotatedLeftBottomPoint = calculateRotatedPoint(
      newLeftBottomPoint,
      newCenterPoint,
      style.rotate
    );

    const {
      newPoint: leftBottomPoint,
      newSymmetricPoint: rightTopPoint,
      newWidth: width,
      newHeight: height
    } = calcDiagonalPosition(
      rotatedLeftBottomPoint,
      symmetricPoint,
      -style.rotate
    );

    newLeftBottomPoint = leftBottomPoint;
    newWidth = width;
    newHeight = height;

    diagonalPoint = rightTopPoint;
  }

  if (newWidth > 0 && newHeight > 0) {
    style.width = newWidth;
    style.height = newHeight;
    style.left = newLeftBottomPoint.x;
    style.top = diagonalPoint.y;
  }
}

function calculateRightBottomPoint(
  style: Recordable,
  pointInfos: PointInfos,
  proportion: number,
  isLockProportion: boolean
) {
  const { symmetricPoint, currentPosition } = pointInfos;

  let {
    newCenterPoint,
    newSymmetricPoint: newLeftTopPoint,
    newPoint: newRightBottomPoint,
    newWidth,
    newHeight
  } = calcDiagonalPosition(currentPosition, symmetricPoint, -style.rotate);

  let diagonalPoint = newLeftTopPoint;

  if (isLockProportion) {
    if (newWidth / newHeight > proportion) {
      //  截短之后右上角会更靠左
      newRightBottomPoint.x -= Math.abs(newWidth - newHeight * proportion);
      newWidth = proportion * newHeight;
    } else {
      newRightBottomPoint.y -= Math.abs(newHeight - newWidth / proportion);
      newHeight = proportion / newWidth;
    }

    const rotatedRightBottomPoint = calculateRotatedPoint(
      newRightBottomPoint,
      newCenterPoint,
      style.rotate
    );

    const {
      newPoint: rightBottomPointPoint,
      newSymmetricPoint: leftTopPoint,
      newWidth: width,
      newHeight: height
    } = calcDiagonalPosition(
      rotatedRightBottomPoint,
      symmetricPoint,
      -style.rotate
    );

    newRightBottomPoint = rightBottomPointPoint;
    newWidth = width;
    newHeight = height;

    diagonalPoint = leftTopPoint;
  }

  if (newWidth > 0 && newHeight > 0) {
    style.width = newWidth;
    style.height = newHeight;
    style.left = diagonalPoint.x;
    style.top = newRightBottomPoint.y - newHeight;
  }
}

function calculateTopPoint(
  style: Recordable,
  pointInfos: PointInfos,
  proportion: number,
  isLockProportion: boolean
) {
  const { symmetricPoint, currentPosition, currentPoint } = pointInfos;

  //  得到拖拽点没有旋转前的坐标，我们只取y值；x值取currentPoint即可
  const unrotatedDragPoint = calculateRotatedPoint(
    currentPosition,
    currentPoint,
    -style.rotate
  );

  //  旋转之后的top点
  const rotatedTopPoint = calculateRotatedPoint(
    {
      x: currentPoint.x,
      y: unrotatedDragPoint.y
    },
    currentPoint,
    style.rotate
  );

  //  勾股定理算高度 旋转后新的坐标点 与 对称点之间的距离就是高度
  const newHeight = getDistanceOfTwoPoints(rotatedTopPoint, symmetricPoint);

  let newWidth = style.width;

  if (isLockProportion) {
    newWidth = newHeight * proportion;
  }

  //  求新的中心点
  const newCenterPoint = getCenterPoint(rotatedTopPoint, symmetricPoint);

  const left = newCenterPoint.x - newWidth / 2;
  const height = newCenterPoint.y - newHeight / 2;

  if (newWidth > 0 && newHeight > 0) {
    style.width = newWidth;
    style.height = newHeight;
    style.left = left;
    style.top = height;
  }
}

function calculateBottomPoint(
  style: Recordable,
  pointInfos: PointInfos,
  proportion: number,
  isLockProportion: boolean
) {
  calculateTopPoint(style, pointInfos, proportion, isLockProportion);
}

function calculateLeftPoint(
  style: Recordable,
  pointInfos: PointInfos,
  proportion: number,
  isLockProportion: boolean
) {
  const { symmetricPoint, currentPosition, currentPoint } = pointInfos;

  const unrotatedDragPoint = calculateRotatedPoint(
    currentPosition,
    currentPoint,
    -style.rotate
  );

  const rotatedLeftPoint = calculateRotatedPoint(
    {
      x: unrotatedDragPoint.x,
      y: currentPoint.y
    },
    currentPoint,
    style.rotate
  );

  //  勾股定理算高度 旋转后新的坐标点 与 对称点之间的距离就是高度
  const newWidth = getDistanceOfTwoPoints(rotatedLeftPoint, symmetricPoint);

  let newHeight = style.height;

  if (isLockProportion) {
    newHeight = newWidth / proportion;
  }

  //  求新的中心点
  const newCenterPoint = getCenterPoint(rotatedLeftPoint, symmetricPoint);

  const left = newCenterPoint.x - newWidth / 2;
  const height = newCenterPoint.y - newHeight / 2;

  if (newWidth > 0 && newHeight > 0) {
    style.width = newWidth;
    style.height = newHeight;
    style.left = left;
    style.top = height;
  }
}

function calculateRightPoint(
  style: Recordable,
  pointInfos: PointInfos,
  proportion: number,
  isLockProportion: boolean
) {
  calculateLeftPoint(style, pointInfos, proportion, isLockProportion);
}

export function calculatePositionAndSize(
  pointName: string,
  style: Recordable,
  proportion: number,
  isLockProportion: boolean,
  pointInfos: PointInfos
) {
  calcFunMap[pointName as CalcFunName](
    style,
    pointInfos,
    proportion,
    isLockProportion
  );
}
