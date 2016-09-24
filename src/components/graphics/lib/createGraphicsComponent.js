const wrapDraw = draw => (graphics, props) => {
  graphics.lineWidth = props.lineWidth || 0;
  graphics.lineColor = props.lineColor || 0;
  graphics.lineAlpha = props.lineAlpha != null ? props.lineAlpha : 1;

  const hasFill = props.fill != null;
  if (hasFill) graphics.beginFill(props.fill, props.alpha);

  draw(graphics, props);

  if (hasFill) graphics.endFill();
};

export default (name, draw) => {
  const Component = () => {
    throw new Error(`Graphics.${draw} can only be used as the direct child of <Graphics />`);
  };

  Component.draw = wrapDraw(draw);
  Component.displayName = name;

  return Component;
};
