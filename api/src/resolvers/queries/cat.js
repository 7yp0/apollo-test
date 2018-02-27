export const cats = async (parent, args, { Cat }) => {
  const allCats = await Cat.find();
  // controller
  return allCats.map(cat => {
    cat._id = cat._id.toString();
    return cat;
  });
};

export const cat = async (parent, args, { Cat }) => {
  const singleCat = await Cat.findOne(args);
  return singleCat;
};
