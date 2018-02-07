export const allCats = async (parent, args, { Cat }) => {
  // service
  const cats = await Cat.find();
  // controller
  return cats.map(cat => {
    cat._id = cat._id.toString();
    return cat;
  });
};

export const createCat = async (parent, args, { Cat }) => {
  const cat = await new Cat(args).save();
  cat._id = cat._id.toString();
  return cat;
};
