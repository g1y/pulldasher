var utils = require('../lib/utils'),
    db = require('../lib/db');

// Builds an object representation of a row in the DB `pull_labels` table
// from the data returned by GitHub's API.
function DBLabel(label) {
   var labelData = label.data;
   this.data = {
      number: labelData.number,
      title: labelData.title,
      repo_name: labelData.repo_name,
      user: labelData.user,
      date: utils.toUnixTime(labelData.created_at)
   };
}

DBLabel.prototype.save = function() {
   var labelData = this.data;
   var q_update = 'REPLACE INTO pull_labels SET ?';

   return db.query(q_update, labelData);
};

DBLabel.prototype.delete = function() {
   var labelData = this.data;
   var q_update = 'DELETE FROM pull_labels WHERE ' +
    'number = ? AND title = ? AND repo_name = ?';

   return db.query(q_update, [labelData.number, labelData.title,
    labelData.repo_name]);
};

module.exports = DBLabel;
