const aclRules = require("./acl-rules.json");

module.exports = function (tableName, req) {
  return true; // turn off ACL temporarily
  let userRole = req.session.user ? req.session.user.userRole : "visitor";
  let method = req.method.toLowerCase();
  method = method === "patch" ? "put" : method;
  let allowed = aclRules?.[userRole]?.[tableName]?.[method];
  return !!allowed;
};
