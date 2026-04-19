const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing users (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // console.log('Cleared existing users');

    const demoUsers = [
      {
        name: 'Ayesha Khan',
        email: 'ayesha@helphub.ai',
        password: await bcrypt.hash('password123', 10),
        skills: ['Figma', 'UI/UX', 'HTML/CSS', 'Career Guidance'],
        interests: ['Hackathons', 'UI/UX', 'Community Building'],
        location: 'Karachi',
        trustScore: 100
      },
      {
        name: 'Hassan Ali',
        email: 'hassan@helphub.ai',
        password: await bcrypt.hash('password123', 10),
        skills: ['JavaScript', 'React', 'Git/GitHub'],
        interests: ['Open Source', 'Web Dev', 'Teaching'],
        location: 'Karachi',
        trustScore: 88
      },
      {
        name: 'Sara Noor',
        email: 'sara@helphub.ai',
        password: await bcrypt.hash('password123', 10),
        skills: ['Python', 'Data Analysis'],
        interests: ['Machine Learning', 'Statistics'],
        location: 'Lahore',
        trustScore: 74
      },
      {
        name: 'Bilal Ahmed',
        email: 'bilal@helphub.ai',
        password: await bcrypt.hash('password123', 10),
        skills: ['Node.js', 'MongoDB', 'Express'],
        interests: ['Backend Dev', 'APIs'],
        location: 'Islamabad',
        trustScore: 82
      },
      {
        name: 'Fatima Zahra',
        email: 'fatima@helphub.ai',
        password: await bcrypt.hash('password123', 10),
        skills: ['React', 'TypeScript', 'Tailwind CSS'],
        interests: ['Frontend Dev', 'Design Systems'],
        location: 'Remote',
        trustScore: 91
      }
    ];

    for (const userData of demoUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
        console.log(`✓ Created user: ${userData.name} (${userData.email})`);
      } else {
        console.log(`- User already exists: ${userData.email}`);
      }
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\nDemo credentials:');
    console.log('Email: ayesha@helphub.ai');
    console.log('Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedUsers();
