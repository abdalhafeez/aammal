const express = require("express");
const router = express.Router();
const Profile = require("../model/Profile");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose")
/* ############################################################
@operation : get profile for current user
@route : /api/dev_profiles/me
@method : get
@access : private
*/
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    if (!profile)
      return res.status(404).send("there's no profile with this user")
    res.json(profile)
  } catch (error) {
    res.status(500).send("Server Error")
  }
})

// @operation : get profile for current user
// @route : /api/dev_profiles/me
// @method : get
// @access : private

router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id })
    if (!profile) return res.status(404).send("Not found")
    console.log(profile)
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})
/* ############################################################
@operation : creating profile
@route : /api/dev_profiles
@method : post
@access : private
*/
router.post("/", authMiddleware, async (req, res) => {
  const { title, loc, website, role, photo, social, bio, skills } = req.body

  const profileData = {}
  profileData.user = req.user.id
  if (title) profileData.title = title
  if (loc) profileData.loc = loc
  if (role) profileData.role = role
  if (website) profileData.website = website
  if (bio) profileData.bio = bio
  if (photo) profileData.photo = photo
  if (skills) profileData.skills = skills
  if (social) profileData.social = social

  try {
    let profile = await Profile.findOne({ user: req.user.id })
    const user = await User.findById(req.user.id)
    if (user.profileType != "employee") {
      return console.log("don't create profile")
    }

    profileData.userName = user.userName

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileData },
        { new: true }
      )
      return res.status(200).json(profile)
    } else {
      profile = new Profile(profileData)
      await profile.save()
      res.status(201).json(profile)
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Server Error" })
  }
})
// add social link
router.put("/social", [authMiddleware], async (req, res) => {
  const { linkedIn, GitHubUserName, twitter } = req.body
  const profile = await Profile.findOne({ user: req.user.id })

  let socialObj = {}
  profile.social.forEach((link) => {
    profile.social.forEach((link) => {
      if (GitHubUserName && link.GitHubUserName === "")
        socialObj.GitHubUserName = GitHubUserName
      if (linkedIn && link.linkedIn === "") socialObj.linkedIn = linkedIn
      if (twitter && link.twitter === "") socialObj.twitter = twitter
    })
  })

  if (!profile) return res.status(404).send("Profile not found")
  profile.social.unshift(req.body)
  // await profile.save()
  console.log(profile.social)
  res.status(200).json(profile.social)
})



// adding experience
router.put(
  "/experience",
  [
    authMiddleware,
    [
      check("from", "your from is required").not().isEmpty(),
      check("loc", " please provide a location").not().isEmpty(),
      check("company", "what is the company worked on?").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const exp = req.body

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.experience.unshift(exp)
      await profile.save()
      res.json(profile)
    } catch (error) {
      res.status(500).send("Server Error")
    }
  }
)
// deleting experience
router.delete("/experience/:exp_id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    // getting experience by id the matches the parmas id
    const exp = profile.experience.find((exp) => exp.id === req.params.exp_id)
    if (!exp) {
      return res
        .status(404)
        .json({ error: { message: "Experience Not Found" } })
    }
    // grabbing the index of the experience to
    const indexToRemove = profile.experience.indexOf(exp).toString()
    const deleted = profile.experience.splice(indexToRemove, 1)
    await profile.save()
    res.json(profile)
  } catch (error) {
    if (error.message === "Cannot read property 'id' of undefined") {
      return res
        .status(404)
        .json({ error: { message: "Experience Not Found" } })
    }
  }
})
// adding education
router.put(
  "/education",
  [
    authMiddleware,
    [
      check("school", " school is required").not().isEmpty(),
      check("degree", " degree is required").not().isEmpty(),
      check("from", " from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { school, name, degree, loc, description, from, to } = req.body
    const eduObj = {
      school,
      name,
      degree,
      loc,
      description,
      from,
      to,
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.education.unshift(eduObj)
      await profile.save()
      res.json(profile)
    } catch (error) {
      res.status(500).send("Server Error")
    }
  }
)
// deleting education
router.delete("/education/:edu_id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    // map all the ids
    const edu_arr = profile.education.map((edu) => edu._id.toString())
    const indexToRemove = edu_arr.find((edu) => edu === req.params.edu_id)
    if (indexToRemove != req.params.edu_id)
      return res.status(404).send("not found")
    profile.education.splice(indexToRemove, 1)
    await profile.save()
    res.status(200).json(profile)
  } catch (error) {
    res.status(500).send("Server Error")
  }
})

module.exports = router;
