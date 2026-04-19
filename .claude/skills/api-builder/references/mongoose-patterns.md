# Mongoose Patterns

Domain expertise for Mongoose models, queries, and TypeScript integration.

## Model Definition with TypeScript

### Basic Model Setup

```typescript
import { Schema, model, Document } from 'mongoose';

// 1. Define interface for the document
interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

// 2. Extend Document for Mongoose methods
interface IUserDocument extends IUser, Document {}

// 3. Create schema with type parameter
const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// 4. Create and export model
export const User = model<IUserDocument>('User', userSchema);
```

### Model with Methods and Statics

```typescript
import { Schema, model, Document, Model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
}

// Instance methods interface
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  getPublicProfile(): Omit<IUser, 'password'>;
}

// Static methods interface
interface IUserModel extends Model<IUserDocument, {}, IUserMethods> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}

// Document interface
interface IUserDocument extends IUser, IUserMethods, Document {}

const userSchema = new Schema<IUserDocument, IUserModel, IUserMethods>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
});

// Instance method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

userSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Static method
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email });
};

export const User = model<IUserDocument, IUserModel>('User', userSchema);
```

## Query Patterns

### Basic CRUD Operations

```typescript
// Create
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  password: hashedPassword
});

// Read - Find one
const user = await User.findById(userId);
const user = await User.findOne({ email: 'john@example.com' });

// Read - Find many
const users = await User.find({ role: 'admin' });

// Update
const user = await User.findByIdAndUpdate(
  userId,
  { name: 'Jane Doe' },
  { new: true, runValidators: true } // Return updated doc, run validators
);

// Delete
const user = await User.findByIdAndDelete(userId);
```

### Advanced Queries

```typescript
// Pagination
const page = 1;
const limit = 10;
const skip = (page - 1) * limit;

const users = await User.find()
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

const total = await User.countDocuments();

// Projection (select specific fields)
const users = await User.find()
  .select('name email role')
  .select('-password'); // Exclude password

// Population (join references)
const posts = await Post.find()
  .populate('author', 'name email')
  .populate({
    path: 'comments',
    select: 'text createdAt',
    populate: { path: 'user', select: 'name' }
  });

// Filtering
const users = await User.find({
  role: 'admin',
  createdAt: { $gte: new Date('2024-01-01') },
  name: { $regex: 'john', $options: 'i' } // Case-insensitive search
});

// Sorting
const users = await User.find()
  .sort({ createdAt: -1, name: 1 }); // -1 desc, 1 asc
```

## Error Handling

### Mongoose Error Types

```typescript
import { Error as MongooseError } from 'mongoose';

export const handleMongooseError = (err: any) => {
  // Validation error
  if (err instanceof MongooseError.ValidationError) {
    const errors = Object.values(err.errors).map(e => e.message);
    throw new AppError(`Validation failed: ${errors.join(', ')}`, 400);
  }

  // Duplicate key error (unique constraint)
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    throw new AppError(`${field} already exists`, 409);
  }

  // Cast error (invalid ObjectId)
  if (err instanceof MongooseError.CastError) {
    throw new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // Document not found
  if (err instanceof MongooseError.DocumentNotFoundError) {
    throw new AppError('Resource not found', 404);
  }

  throw err;
};
```

### Schema-Level Error Handling

```typescript
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// Post-save error handler for duplicate keys
userSchema.post('save', function(error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already exists'));
  } else {
    next(error);
  }
});

// Pre-save validation
userSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    // Custom validation logic
    if (!this.email.includes('@')) {
      return next(new Error('Invalid email format'));
    }
  }
  next();
});
```

## Transactions

### Using Transactions for Atomic Operations

```typescript
import mongoose from 'mongoose';

export const transferFunds = async (
  fromUserId: string,
  toUserId: string,
  amount: number
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Deduct from sender
    const sender = await User.findByIdAndUpdate(
      fromUserId,
      { $inc: { balance: -amount } },
      { new: true, session }
    );

    if (!sender || sender.balance < 0) {
      throw new AppError('Insufficient funds', 400);
    }

    // Add to receiver
    await User.findByIdAndUpdate(
      toUserId,
      { $inc: { balance: amount } },
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    return sender;
  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
```

### Using withTransaction Helper

```typescript
export const createUserWithProfile = async (userData: any, profileData: any) => {
  const session = await mongoose.startSession();

  return await session.withTransaction(async () => {
    // Create user
    const [user] = await User.create([userData], { session });

    // Create profile
    const [profile] = await Profile.create(
      [{ ...profileData, userId: user._id }],
      { session }
    );

    return { user, profile };
  });
};
```

## Middleware (Hooks)

### Pre and Post Hooks

```typescript
// Pre-save: Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Post-save: Log user creation
userSchema.post('save', function(doc) {
  console.log(`User created: ${doc._id}`);
});

// Pre-remove: Cascade delete
userSchema.pre('remove', async function(next) {
  await Post.deleteMany({ author: this._id });
  next();
});

// Pre-find: Exclude soft-deleted documents
userSchema.pre(/^find/, function(next) {
  this.find({ deleted: { $ne: true } });
  next();
});
```

## Virtuals

### Virtual Properties

```typescript
const userSchema = new Schema({
  firstName: String,
  lastName: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual getter
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual setter
userSchema.virtual('fullName').set(function(name: string) {
  const [firstName, lastName] = name.split(' ');
  this.firstName = firstName;
  this.lastName = lastName;
});

// Virtual populate (reference without storing)
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

// Usage
const user = await User.findById(userId).populate('posts');
console.log(user.fullName); // "John Doe"
console.log(user.posts); // Array of posts
```

## Indexes

### Creating Indexes

```typescript
const userSchema = new Schema({
  email: { type: String, unique: true }, // Creates unique index
  name: { type: String, index: true }, // Creates regular index
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: [Number]
  }
});

// Compound index
userSchema.index({ email: 1, role: 1 });

// Text index for search
userSchema.index({ name: 'text', bio: 'text' });

// Geospatial index
userSchema.index({ location: '2dsphere' });

// Sparse index (only index documents with the field)
userSchema.index({ phoneNumber: 1 }, { sparse: true });

// TTL index (auto-delete after expiration)
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

## Best Practices

### 1. Always Use Lean for Read-Only Queries

```typescript
// ❌ Returns full Mongoose document (slower)
const users = await User.find();

// ✅ Returns plain JavaScript object (faster)
const users = await User.find().lean();
```

### 2. Use Select to Limit Fields

```typescript
// ❌ Fetches all fields
const user = await User.findById(userId);

// ✅ Only fetch needed fields
const user = await User.findById(userId).select('name email');
```

### 3. Use Indexes for Frequent Queries

```typescript
// If you frequently query by email and role
userSchema.index({ email: 1, role: 1 });
```

### 4. Handle Validation Errors Properly

```typescript
try {
  await User.create(userData);
} catch (error) {
  if (error instanceof mongoose.Error.ValidationError) {
    // Handle validation errors
    const messages = Object.values(error.errors).map(e => e.message);
    throw new AppError(messages.join(', '), 400);
  }
  throw error;
}
```

### 5. Use Transactions for Multi-Document Operations

```typescript
// ❌ Not atomic - can fail partially
await User.findByIdAndUpdate(userId, { balance: newBalance });
await Transaction.create({ userId, amount });

// ✅ Atomic - all or nothing
const session = await mongoose.startSession();
await session.withTransaction(async () => {
  await User.findByIdAndUpdate(userId, { balance: newBalance }, { session });
  await Transaction.create([{ userId, amount }], { session });
});
```

## Common Pitfalls

### 1. Not Awaiting Queries

```typescript
// ❌ Wrong: Query not executed
const users = User.find();

// ✅ Correct: Await the query
const users = await User.find();
```

### 2. Modifying Lean Documents

```typescript
// ❌ Wrong: Lean documents don't have save()
const user = await User.findById(userId).lean();
user.name = 'New Name';
await user.save(); // Error!

// ✅ Correct: Use update or don't use lean
await User.findByIdAndUpdate(userId, { name: 'New Name' });
```

### 3. Not Using new: true in Updates

```typescript
// ❌ Returns old document
const user = await User.findByIdAndUpdate(userId, { name: 'New' });

// ✅ Returns updated document
const user = await User.findByIdAndUpdate(
  userId,
  { name: 'New' },
  { new: true }
);
```
