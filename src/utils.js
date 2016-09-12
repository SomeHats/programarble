export const centerGameObjects = (objects) => {
  objects.forEach((object) => {
    object.anchor.setTo(0.5);
  });
};

export const setResponsiveWidth = (sprite, percent, parent) => {
  const percentWidth =
    ((sprite.texture.width - (parent.width / (100 / percent))) / sprite.texture.width) * 100;

  sprite.width = parent.width / (100 / percent);
  sprite.height = sprite.texture.height - ((sprite.texture.height * percentWidth) / 100);
};
