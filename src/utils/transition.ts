import { Point } from "@/types/typing";

/**
 * 角度转弧度
 * @param angel
 * @returns
 */
export function angelToRadian(angel: number) {
  return (angel * Math.PI) / 180;
}

/**
 * 传一组对称的点
 * @param p1
 * @param p2
 */
export function getCenterPoint(p1: Point, p2: Point): Point {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}

/**
 * 计算两点之间的距离
 * @param p1
 * @param p2
 * @returns
 */
export function getDistanceOfTwoPoints(p1: Point, p2: Point) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

/**
 * 根据三角函数计算出旋转后的点坐标
 *
 * @param beforeRotatedPoint 旋转前的点
 * @param centerPoint  中线点
 * @param rotateAngel 旋转的角度
 *
 * 旋转公式
 * cos(θ1 + θ) = x2 / r  -->  x1cosθ - y1sinθ = x2
 * sin(θ1 + θ) = y2 / r  -->  y1cosθ + x1sinθ = y2
 */
export function calculateRotatedPoint(
  beforeRotatedPoint: Point,
  centerPoint: Point,
  rotateAngel: number
): Point {
  const x1 = beforeRotatedPoint.x - centerPoint.x;
  const y1 = beforeRotatedPoint.y - centerPoint.y;

  const x = x1 * cos(rotateAngel) - y1 * sin(rotateAngel) + centerPoint.x;
  const y = x1 * sin(rotateAngel) + y1 * cos(rotateAngel) + centerPoint.y;

  return {
    x,
    y
  };
}

/**
 * 余弦
 * @param angel 角度
 */
export function cos(angel: number) {
  return Math.cos(angelToRadian(angel));
}

/**
 * 正弦
 * @param angel 角度
 */
export function sin(angel: number) {
  return Math.sin(angelToRadian(angel));
}
