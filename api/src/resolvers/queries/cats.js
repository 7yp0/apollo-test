export const allCats = async (parent, args, { Cat }) => {
  const cats = await Cat.find();
  // controller
  return cats.map(cat => {
    cat._id = cat._id.toString();
    return cat;
  });
};

export const getCat = async (parent, args, { Cat }) => {
  const cat = await Cat.findOne(args);
  return cat;
};
