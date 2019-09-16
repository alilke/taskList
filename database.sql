
CREATE TABLE "toDo" (
	"id" serial primary key,
    "task" character varying(50) NOT NULL,
    "dueDate" DATE,
    "category" character varying(50),
    "notes" character varying(120),
    "completed" boolean
);


INSERT INTO "toDo"("task", "dueDate", "category", "notes", "progress")
VALUES ('make bed', '2019-09-16', 'home','take out of dryer and out on bed','false');
INSERT INTO "toDo"("task", "dueDate", "category", "notes", "progress")
VALUES ('finish homework', '2019-09-17', 'school','submit assignment and feedback','false');
INSERT INTO "toDo"("task", "dueDate", "category", "notes", "progress")
VALUES ('feed cats', '2019-09-16', 'home','feed pippin dry food, charlie wet food','false');
INSERT INTO "toDo"("task", "dueDate", "category", "notes", "progress")
VALUES ('make lunch', '2019-09-16', 'home','meal prep for week','false');
INSERT INTO "toDo"("task", "dueDate", "category", "notes", "progress")
VALUES ('call photographer', '2019-09-18', 'wedding','set up meeting','false');
INSERT INTO "toDo"("task", "dueDate", "category", "notes", "progress")
VALUES ('clean out car', '2019-09-19', 'home','get car road trip ready','false');