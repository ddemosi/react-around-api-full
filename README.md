# Project 15: React with full API!

Almost there:

Draft 1:

* Organization is a bit of a mess. Takes a while to read.
* Haven't tested on the live server yet, so we'll see how this goes.
* Error handling could be cleaner, and I have yet to test every possible type of error. Yay for bug fixing.
* Postman is my friend.

Draft 2:

* Fixed message issues with central error handling.
* Added Celebrate validation to all routes.
* Added RegEx to password fields.
* Added error handling for MongoErrors and Celebrate errors
* Moved logs to an auto-generated log folder

Draft 3:

* Turns out when you add the "err" variable, that turns a function into "error handling middleware", which was breaking the /signup route. Any issues with /signup should be resolved.
* Substituted built in .uri() Joi validators for a similar Regex to the one used by validator.js. Seemed like the simpler solution over creating a whole new helper file structure just to use the validator package.
* Fixed linting errors. Primary error had to do with the error handling middleware and a comma recommendation that was breaking functionality. Added all to the temporary ignore list.

Link to live site: http://danny-demosi.students.nomoreparties.site
Server public IP: 52.250.0.223
