# Group Assignment Implementation Guide

## Overview
The application now randomly assigns participants to either **Intervention** or **Control** groups with different display logic for each group.

## Changes Made

### 1. Database Schema
- Added `group` column (VARCHAR) to the `participants` table
- Stores either "Intervention" or "Control"

### 2. Submission Logic (App.jsx)

#### Random Assignment
```javascript
const assignedGroup = Math.random() < 0.5 ? 'Intervention' : 'Control'
```
- 50/50 chance of being assigned to either group
- Assignment happens during form submission

#### Database Update
```javascript
.update({ 
  id_used: true,
  group: assignedGroup
})
```
- Saves the assigned group to the database
- Marks participant as used

#### Participant Data
```javascript
setParticipantData({
  participant_number: participants.participant_number,
  password: participants.participant_password,
  group: assignedGroup
})
```
- Passes group information to the success page

### 3. Success Page Display (SuccessPage.jsx)

#### Intervention Group
**Shows:**
- ✅ Participant Number
- ✅ Password
- ✅ "Intervention Group" banner (blue)
- ✅ Instructions to download and use SHANTHI app
- ✅ Security warning about credentials

**Next Steps:**
1. Save credentials securely
2. Navigate to SHANTHI application
3. Sign in with credentials
4. Use app for relaxation and learning

#### Control Group
**Shows:**
- ✅ Participant Number only
- ❌ No password displayed
- ✅ "Control Group" banner (purple)
- ✅ Instructions for control group protocol
- ✅ Information about future contact

**Next Steps:**
1. Save participant number
2. Wait for further instructions
3. Continue regular activities
4. Complete follow-up assessments when contacted

## Visual Differences

### Intervention Group
- **Banner Color:** Blue (bg-blue-50, border-blue-300)
- **Displays:** Both participant number and password
- **Copy Button:** "Copy Credentials"
- **Security Notice:** Yellow warning box displayed

### Control Group
- **Banner Color:** Purple (bg-purple-50, border-purple-300)
- **Displays:** Participant number only
- **Copy Button:** "Copy Participant Number"
- **Security Notice:** Blue info box displayed (no yellow warning)

## Testing

To test both groups, submit the form multiple times and observe:
1. Random group assignment (approximately 50% each)
2. Different success page displays
3. Group value saved correctly in database

## Database Query Example

To check group distribution:
```sql
SELECT 
  "group", 
  COUNT(*) as count 
FROM participants 
WHERE id_used = true 
GROUP BY "group";
```

To view all assigned participants:
```sql
SELECT 
  participant_number, 
  "group",
  created_at 
FROM participants 
WHERE id_used = true 
ORDER BY created_at DESC;
```

## Important Notes

1. **Random Assignment:** Each submission has a 50/50 chance of either group
2. **Irreversible:** Group assignment cannot be changed after submission
3. **Database Column:** Ensure the `group` column exists in your Supabase `participants` table
4. **Case Sensitive:** Group values are stored as "Intervention" and "Control" (capital first letter)

## Future Enhancements

If needed, you can:
- Adjust randomization ratio (e.g., 60/40 split)
- Add stratified randomization based on demographics
- Implement block randomization to ensure equal group sizes
- Add group assignment logging for audit purposes
