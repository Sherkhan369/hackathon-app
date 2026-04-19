// AI Helper Functions for Hackathon Demo

function detectUrgency(description) {
  const urgentKeywords = ['urgent', 'asap', 'immediately', 'emergency', 'critical', 'help now', 'stuck'];
  const highKeywords = ['soon', 'today', 'deadline', 'important', 'need help'];

  const lowerDesc = description.toLowerCase();

  if (urgentKeywords.some(keyword => lowerDesc.includes(keyword))) {
    return 'High';
  }

  if (highKeywords.some(keyword => lowerDesc.includes(keyword))) {
    return 'Medium';
  }

  return 'Low';
}

function categorizeRequest(title, description) {
  const text = (title + ' ' + description).toLowerCase();

  const categories = {
    'coding': ['code', 'bug', 'javascript', 'python', 'react', 'node', 'api', 'function', 'error', 'debug'],
    'design': ['design', 'ui', 'ux', 'figma', 'photoshop', 'logo', 'layout', 'color', 'mockup'],
    'database': ['database', 'sql', 'mongodb', 'query', 'schema', 'data'],
    'deployment': ['deploy', 'hosting', 'vercel', 'heroku', 'server', 'production'],
    'learning': ['learn', 'tutorial', 'understand', 'explain', 'how to', 'guide']
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }

  return 'general';
}

function suggestTags(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  const suggestedTags = [];

  const tagMap = {
    'javascript': ['javascript', 'js'],
    'react': ['react', 'reactjs'],
    'node': ['node', 'nodejs', 'express'],
    'python': ['python', 'py'],
    'css': ['css', 'styling', 'style'],
    'html': ['html'],
    'mongodb': ['mongodb', 'mongo', 'database'],
    'api': ['api', 'rest', 'endpoint'],
    'frontend': ['frontend', 'ui', 'interface'],
    'backend': ['backend', 'server'],
    'bug': ['bug', 'error', 'issue'],
    'help': ['help', 'stuck', 'problem']
  };

  for (const [tag, keywords] of Object.entries(tagMap)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      suggestedTags.push(tag);
    }
  }

  return suggestedTags.slice(0, 5);
}

function generateAISummary(request) {
  const urgencyEmoji = {
    'High': '🔴',
    'Medium': '🟡',
    'Low': '🟢'
  };

  const emoji = urgencyEmoji[request.urgency] || '⚪';

  return `${emoji} ${request.urgency} priority ${request.category} request. User needs help with: ${request.title}. ${request.tags?.length ? 'Related to: ' + request.tags.join(', ') : ''}`;
}

module.exports = {
  detectUrgency,
  categorizeRequest,
  suggestTags,
  generateAISummary
};
