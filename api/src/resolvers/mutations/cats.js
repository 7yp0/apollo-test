export const createCat = async (parent, args, { Cat }) => {
  const cat = await new Cat(args).save();
  cat._id = cat._id.toString();
  return cat;
};
