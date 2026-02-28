import { Stage, Layer, Rect } from "react-konva";
import { generators } from "../game/generators";
import type { ShapeParams } from "../game/types";

interface Props {
  generatorKey: string;
  params: ShapeParams;
  size: number;
}

export default function ShapeCanvas({ generatorKey, params, size }: Props) {
  const render = generators[generatorKey];
  return (
    <Stage width={size} height={size}>
      <Layer>
        <Rect width={size} height={size} fill="#ffffff" cornerRadius={8} />
        {render(size, params)}
      </Layer>
    </Stage>
  );
}
