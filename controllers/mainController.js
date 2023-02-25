exports.index = (req, res) => {
  res.render('./index', {
    page_name: 'Coding COrner'
  });
};

exports.about = (req, res) => {
  res.render('./about', {
    page_name: 'About'
  });
};

exports.contact = (req, res) => {
  res.render('./contact', {
    page_name: 'Contact'
  });
};