/**
 * has-edit
 *
 * A simple policy that blocks requests from people without either create edit or edit full.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

  // First, check whether the request comes from a logged-in user.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  if (!req.me) {
    return res.unauthorized();
  }//•

  // Then check that this user has create edit or edit full.
  if (!(req.me.hasCreateEdit || req.me.hasEditFull)) {
    return res.forbidden();
  }//•

  return proceed();

};
