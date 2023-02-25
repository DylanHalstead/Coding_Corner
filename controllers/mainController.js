exports.index = (req, res) => {
  res.locals.title = "Coding Corner"
  res.render('./index', {
    page_name: 'index'
  });
};

exports.about = (req, res) => {
  res.render('./about', {
    page_name: 'about'
  });
};

exports.contact = (req, res) => {
  res.render('./contact', {
    page_name: 'contact'
  });
};