const express = require('express')
const router = express.Router()
const Joi = require('joi')

const courses = [
  {id: 1, name: 'course 1'},
  {id: 2, name: 'course 2'},
  {id: 3, name: 'course 3'}
]

// GET all courses
router.get('/', (req, res) => {
  res.send(courses)
})

// GET all course/id
router.get('/:id', (req, res) => {
  const course = courses.find((course)=>course.id === parseInt(req.params.id))
  if(!course) return res.status(404).send({error:'course not found'})
  res.send(course)
})

// POST all courses
router.post('/', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message)
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }

  courses.push(course)
  res.send(course)
})

// PUT all courses/id
router.put('/:id', (req, res) => {
  const course = courses.find((course=>course.id === parseInt(req.params.id)))
  if (!course) {
    return res.status(400).send({error: 'No course with this ID'})
  }
  const { error } = validateCourse(req.body)
  if (error) {
    return res.status(400).send({error: error.details[0].message})
  }

  course.name = req.body.name
  res.send(course)
})

// DELETE all courses/id
router.delete('/:id', (req, res) => {
  const course = courses.find((course=>course.id === parseInt(req.params.id)))
  if (!course) {
    return res.status(400).send('No course with this ID')
  }
  const courseIndex = courses.indexOf(course)
  courses.splice(courseIndex,1)

  res.send(course)
})

// validate course object
const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })

  return schema.validate(course)
}

module.exports = router;