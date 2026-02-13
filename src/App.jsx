import { useState, useRef, useCallback, useEffect } from 'react'
import Editor, { loader } from '@monaco-editor/react'
import { Play, Trash2, Code2, Terminal, Loader2, Copy, Check, Moon, Sun, Info, X, Mail, GraduationCap, Brain, Bot, Sparkles } from 'lucide-react'
import { loadPyodide } from 'pyodide'
import './App.css'

// Define custom Monaco Editor themes
const defineCustomThemes = (monaco) => {
  // Kode_dic Dark Theme - Vibrant neon colors
  monaco.editor.defineTheme('kodi-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      // Keywords - Bright Cyan
      { token: 'keyword', foreground: '00D9FF', fontStyle: 'bold' },
      { token: 'keyword.control', foreground: 'FF00FF', fontStyle: 'bold' },
      { token: 'keyword.operator', foreground: '00FFFF' },
      
      // Strings - Bright Green
      { token: 'string', foreground: '39FF14' },
      { token: 'string.quote', foreground: '39FF14' },
      { token: 'string.escape', foreground: '00FF88' },
      
      // Comments - Grayish purple
      { token: 'comment', foreground: '6C5B7B', fontStyle: 'italic' },
      { token: 'comment.doc', foreground: '8E7CC3', fontStyle: 'italic' },
      
      // Numbers - Bright Orange
      { token: 'number', foreground: 'FF6B35' },
      { token: 'number.float', foreground: 'FF8C42' },
      { token: 'number.hex', foreground: 'FFD93D' },
      
      // Functions - Bright Yellow
      { token: 'function', foreground: 'FFD700' },
      { token: 'function.call', foreground: 'FFC107' },
      { token: 'function.definition', foreground: 'FFB300' },
      
      // Variables - White/Light Blue
      { token: 'variable', foreground: 'E0E0E0' },
      { token: 'variable.parameter', foreground: '81D4FA' },
      { token: 'variable.language', foreground: 'FF69B4', fontStyle: 'bold' },
      
      // Types/Classes - Bright Purple
      { token: 'type', foreground: 'C77DFF', fontStyle: 'bold' },
      { token: 'class', foreground: 'E0AAFF', fontStyle: 'bold' },
      { token: 'interface', foreground: 'D4A5FF' },
      
      // Operators - Bright Red/Pink
      { token: 'operator', foreground: 'FF006E' },
      { token: 'delimiter', foreground: 'FF4D6D' },
      
      // Decorators/Attributes - Bright Teal
      { token: 'decorator', foreground: '00F5D4' },
      { token: 'attribute', foreground: '00BBF9' },
      
      // Constants - Bright Gold
      { token: 'constant', foreground: 'FFD700', fontStyle: 'bold' },
      { token: 'constant.language', foreground: 'FFA500', fontStyle: 'bold' },
      
      // Tags (for HTML/XML) - Bright Blue
      { token: 'tag', foreground: '00B4D8' },
      { token: 'tag.delimiter', foreground: '90E0EF' },
      
      // Properties - Light Purple
      { token: 'property', foreground: 'B8B8FF' },
      { token: 'property.definition', foreground: 'C8B6FF' },
    ],
    colors: {
      'editor.background': '#0D0D12',
      'editor.foreground': '#E0E0E0',
      'editor.lineHighlightBackground': '#1A1A2E',
      'editorLineNumber.foreground': '#4A4A6A',
      'editorLineNumber.activeForeground': '#00D9FF',
      'editor.selectionBackground': '#264F78',
      'editor.selectionHighlightBackground': '#2D4263',
      'editor.wordHighlightBackground': '#2D4263',
      'editor.wordHighlightStrongBackground': '#3D5A80',
      'editorCursor.foreground': '#00D9FF',
      'editor.findMatchBackground': '#FFD700',
      'editor.findMatchHighlightBackground': '#FFD70055',
    }
  })

  // Kode_dic Light Theme - Vibrant pastel colors
  monaco.editor.defineTheme('kodi-light', {
    base: 'vs',
    inherit: true,
    rules: [
      // Keywords - Deep Purple
      { token: 'keyword', foreground: '7B2CBF', fontStyle: 'bold' },
      { token: 'keyword.control', foreground: '9D4EDD', fontStyle: 'bold' },
      { token: 'keyword.operator', foreground: '5A189A' },
      
      // Strings - Deep Green
      { token: 'string', foreground: '2D6A4F' },
      { token: 'string.quote', foreground: '40916C' },
      { token: 'string.escape', foreground: '52B788' },
      
      // Comments - Soft Gray
      { token: 'comment', foreground: '8D99AE', fontStyle: 'italic' },
      { token: 'comment.doc', foreground: '6C757D', fontStyle: 'italic' },
      
      // Numbers - Deep Orange
      { token: 'number', foreground: 'E85D04' },
      { token: 'number.float', foreground: 'F48C06' },
      { token: 'number.hex', foreground: 'FAA307' },
      
      // Functions - Deep Blue
      { token: 'function', foreground: '0077B6' },
      { token: 'function.call', foreground: '0096C7' },
      { token: 'function.definition', foreground: '023E8A' },
      
      // Variables - Dark Gray
      { token: 'variable', foreground: '212529' },
      { token: 'variable.parameter', foreground: '495057' },
      { token: 'variable.language', foreground: 'D00000', fontStyle: 'bold' },
      
      // Types/Classes - Deep Pink
      { token: 'type', foreground: 'C9184A', fontStyle: 'bold' },
      { token: 'class', foreground: 'FF4D6D', fontStyle: 'bold' },
      { token: 'interface', foreground: 'FF758F' },
      
      // Operators - Deep Red
      { token: 'operator', foreground: 'D00000' },
      { token: 'delimiter', foreground: '9D0208' },
      
      // Decorators/Attributes - Deep Teal
      { token: 'decorator', foreground: '006D77' },
      { token: 'attribute', foreground: '118AB2' },
      
      // Constants - Deep Gold
      { token: 'constant', foreground: 'B8860B', fontStyle: 'bold' },
      { token: 'constant.language', foreground: 'D4A017', fontStyle: 'bold' },
      
      // Tags - Deep Cyan
      { token: 'tag', foreground: '0077B6' },
      { token: 'tag.delimiter', foreground: '0096C7' },
      
      // Properties - Soft Purple
      { token: 'property', foreground: '6A4C93' },
      { token: 'property.definition', foreground: '8B5CF6' },
    ],
    colors: {
      'editor.background': '#F8F9FA',
      'editor.foreground': '#212529',
      'editor.lineHighlightBackground': '#E9ECEF',
      'editorLineNumber.foreground': '#ADB5BD',
      'editorLineNumber.activeForeground': '7B2CBF',
      'editor.selectionBackground': '#DEE2E6',
      'editor.selectionHighlightBackground': '#CED4DA',
      'editor.wordHighlightBackground': '#E9D8A6',
      'editor.wordHighlightStrongBackground': '#F4A261',
      'editorCursor.foreground': '7B2CBF',
      'editor.findMatchBackground': '#FFD700',
      'editor.findMatchHighlightBackground': '#FFD70055',
    }
  })
}

// Initialize Monaco themes
loader.init().then((monaco) => {
  defineCustomThemes(monaco)
})

const defaultCode = {
  python: `# Welcome to Online Code Compiler!
# Write your Python code here and click Run

def greet(name):
    return f"Hello, {name}!"

result = greet("World")
print(result)

# Try modifying this code and see the output!`,
  javascript: `// Welcome to Online Code Compiler!
// Write your JavaScript code here and click Run

function greet(name) {
    return \`Hello, \${name}!\`;
}

const result = greet("World");
console.log(result);

// Try modifying this code and see the output!`,
  typescript: `// Welcome to Online Code Compiler!
// Write your TypeScript code here and click Run

function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

const result: string = greet("World");
console.log(result);

// Try modifying this code and see the output!`
}

const languageConfig = {
  python: { 
    label: 'Python', 
    color: '#3776AB', 
    colorLight: '#4a9fd8',
    colorShadow: 'rgba(55, 118, 171, 0.4)',
    extension: 'python',
    icon: '🐍'
  },
  javascript: { 
    label: 'JavaScript', 
    color: '#F7DF1E', 
    colorLight: '#ffe945',
    colorShadow: 'rgba(247, 223, 30, 0.4)',
    extension: 'javascript',
    icon: '⚡'
  },
  typescript: { 
    label: 'TypeScript', 
    color: '#3178C6', 
    colorLight: '#4c9aff',
    colorShadow: 'rgba(49, 120, 198, 0.4)',
    extension: 'typescript',
    icon: '🔷'
  }
}

function App() {
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState(defaultCode.python)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [hasOutput, setHasOutput] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const pyodideRef = useRef(null)
  const outputRef = useRef(null)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmallMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const executeJavaScript = useCallback(async (codeToRun) => {
    const startTime = performance.now()
    const logs = []
    const originalLog = console.log
    const originalError = console.error
    
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }
    
    console.error = (...args) => {
      logs.push('[Error]: ' + args.map(arg => String(arg)).join(' '))
    }

    try {
      if (language === 'typescript') {
        // Simple TypeScript to JavaScript transpilation
        const transpiled = codeToRun
          .replace(/:\s*string\b/g, '')
          .replace(/:\s*number\b/g, '')
          .replace(/:\s*boolean\b/g, '')
          .replace(/:\s*any\b/g, '')
          .replace(/:\s*\w+\[\]/g, '')
          .replace(/:\s*\{[^}]+\}/g, '')
          .replace(/interface\s+\w+\s*\{[^}]+\}/g, '')
          .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
        eval(transpiled)
      } else {
        eval(codeToRun)
      }
      const endTime = performance.now()
      const executionTime = (endTime - startTime).toFixed(2)
      const output = logs.join('\n') || 'Code executed successfully (no output)'
      setOutput(`[Executed in ${executionTime}ms]\n${'='.repeat(40)}\n${output}`)
    } catch (error) {
      const endTime = performance.now()
      const executionTime = (endTime - startTime).toFixed(2)
      setOutput(`[Executed in ${executionTime}ms]\n${'='.repeat(40)}\nError: ${error.message}`)
    } finally {
      console.log = originalLog
      console.error = originalError
    }
  }, [language])

  const executePython = useCallback(async (codeToRun) => {
    const startTime = performance.now()
    try {
      if (!pyodideRef.current) {
        setOutput('Loading Python runtime...')
        pyodideRef.current = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/'
        })
      }

      // Capture output using StringIO
      await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO

# Create string buffers for stdout and stderr
_stdout = StringIO()
_stderr = StringIO()

# Store original streams
_original_stdout = sys.stdout
_original_stderr = sys.stderr

# Redirect to buffers
sys.stdout = _stdout
sys.stderr = _stderr
`)

      setOutput('')
      
      try {
        // Run the user code
        await pyodideRef.current.runPythonAsync(codeToRun)
        
        // Get the captured output
        const capturedOutput = await pyodideRef.current.runPythonAsync(`
# Get output from buffers
output_text = _stdout.getvalue()
error_text = _stderr.getvalue()

# Restore original streams
sys.stdout = _original_stdout
sys.stderr = _original_stderr

# Combine output
result = output_text
if error_text:
    result += error_text

result
`)
        
        const endTime = performance.now()
        const executionTime = (endTime - startTime).toFixed(2)
        const separator = '='.repeat(40)
        
        if (capturedOutput && capturedOutput.trim()) {
          setOutput(`[Executed in ${executionTime}ms]\n${separator}\n${capturedOutput}`)
        } else {
          setOutput(`[Executed in ${executionTime}ms]\n${separator}\nCode executed successfully (no output)`)
        }
      } catch (execError) {
        const endTime = performance.now()
        const executionTime = (endTime - startTime).toFixed(2)
        const separator = '='.repeat(40)
        
        // Try to get any output before error
        try {
          const partialOutput = await pyodideRef.current.runPythonAsync(`
output_text = _stdout.getvalue()
error_text = _stderr.getvalue()
sys.stdout = _original_stdout
sys.stderr = _original_stderr
output_text + error_text
`)
          if (partialOutput && partialOutput.trim()) {
            setOutput(`[Executed in ${executionTime}ms]\n${separator}\n${partialOutput}\n\nError: ${execError.message}`)
          } else {
            setOutput(`[Executed in ${executionTime}ms]\n${separator}\nError: ${execError.message}`)
          }
        } catch (e) {
          setOutput(`[Executed in ${executionTime}ms]\n${separator}\nError: ${execError.message}`)
        }
      }
    } catch (error) {
      const endTime = performance.now()
      const executionTime = (endTime - startTime).toFixed(2)
      const separator = '='.repeat(40)
      setOutput(`[Executed in ${executionTime}ms]\n${separator}\nError: ${error.message}`)
    }
  }, [])

  const runCode = useCallback(async () => {
    setIsRunning(true)
    setOutput('Running...')
    setHasOutput(true)

    if (language === 'python') {
      await executePython(code)
    } else {
      await executeJavaScript(code)
    }

    setIsRunning(false)
    
    // On mobile, automatically show output after running
    if (isMobile) {
      setShowOutput(true)
    }
  }, [language, code, executeJavaScript, executePython, isMobile])

  const clearOutput = () => {
    setOutput('')
    setHasOutput(false)
    setShowOutput(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
    setCode(defaultCode[newLang])
    setOutput('')
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="logo">
          <Code2 size={28} />
          <h1>Kode_dic</h1>
        </div>
        <div className="header-controls">
          <button 
            className="about-btn"
            onClick={() => setShowAbout(true)}
          >
            <Info size={20} />
            <span>About</span>
          </button>
          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* About Modal */}
      {showAbout && (
        <div className="about-modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            <button className="about-close-btn" onClick={() => setShowAbout(false)}>
              <X size={24} />
            </button>
            
            <div className="about-content">
              <div className="about-header">
                <div className="about-icon">
                  <Code2 size={48} />
                </div>
                <h2>Kode_dic</h2>
                <p className="about-tagline">Code. Compile. Create.</p>
              </div>
              
              <div className="about-divider"></div>
              
              <div className="about-creator">
                <h3>
                  <Sparkles size={20} className="section-icon" />
                  Meet the Creator
                </h3>
                <div className="creator-card">
                  <div className="creator-avatar">
                    <span>KS</span>
                  </div>
                  <div className="creator-info">
                    <h4>Keval Saud</h4>
                    <div className="creator-badges">
                      <span className="badge">
                        <Bot size={14} />
                        AI Developer
                      </span>
                      <span className="badge">
                        <Brain size={14} />
                        Automation Dev
                      </span>
                      <span className="badge">
                        <GraduationCap size={14} />
                        Postgraduate Student
                      </span>
                    </div>
                  </div>
                </div>
                <p className="creator-bio">
                  Passionate about coding and creating video content. 
                  Always exploring the fascinating world of AI systems and 
                  automation technologies. Believes in the power of code to 
                  transform ideas into reality.
                </p>
              </div>
              
              <div className="about-divider"></div>
              
              <div className="about-contact">
                <h3>
                  <Mail size={20} className="section-icon" />
                  Get in Touch
                </h3>
                <p className="contact-text">
                  Found a bug? Have suggestions? Want to collaborate? 
                  I'd love to hear from you!
                </p>
                <a 
                  href="mailto:kevalsaud1825@gmail.com" 
                  className="contact-email"
                >
                  <Mail size={18} />
                  kevalsaud1825@gmail.com
                </a>
              </div>
              
              <div className="about-footer">
                <p>Made with ❤️ and lots of ☕</p>
                <p className="thank-you">Thank you for using Kode_dic! 🚀</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="main-container">
        <div className="toolbar">
          <div className="language-selector">
            {Object.entries(languageConfig).map(([key, config]) => (
              <button
                key={key}
                className={`lang-btn ${language === key ? 'active' : ''}`}
                onClick={() => handleLanguageChange(key)}
                style={{ 
                  '--lang-color': config.color,
                  '--lang-color-light': config.colorLight,
                  '--lang-color-shadow': config.colorShadow
                }}
              >
                <span>{config.icon} {config.label}</span>
              </button>
            ))}
          </div>

          <div className="action-buttons">
            <button className="btn btn-copy" onClick={copyCode}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button 
              className="btn btn-run" 
              onClick={runCode}
              disabled={isRunning}
            >
              {isRunning ? (
                <><Loader2 size={18} className="spin" /> Running...</>
              ) : (
                <><Play size={18} /> Run Code</>
              )}
            </button>
          </div>
        </div>

        <div className={`editor-container ${isMobile ? 'mobile-layout' : ''} ${showOutput ? 'show-output' : ''}`}>
          {/* Mobile View Toggle */}
          {isMobile && (
            <div className="mobile-view-toggle">
              <button 
                className={`view-toggle-btn ${!showOutput ? 'active' : ''}`}
                onClick={() => setShowOutput(false)}
              >
                <Code2 size={18} />
                <span>Code</span>
              </button>
              <button 
                className={`view-toggle-btn ${showOutput ? 'active' : ''} ${hasOutput ? 'has-output' : ''}`}
                onClick={() => hasOutput && setShowOutput(true)}
                disabled={!hasOutput}
              >
                <Terminal size={18} />
                <span>Output</span>
                {hasOutput && <span className="output-badge"></span>}
              </button>
            </div>
          )}

          <div className="editor-section">
            <div className="section-header">
              <Code2 size={16} />
              <span>Editor</span>
              <span className="file-info" style={{
                  background: `linear-gradient(135deg, ${languageConfig[language].color}20, ${languageConfig[language].colorLight}20)`,
                  color: languageConfig[language].color,
                  border: `1px solid ${languageConfig[language].color}30`
                }}>
                  {languageConfig[language].icon} main.{languageConfig[language].extension}
                </span>
            </div>
            <Editor
              height="100%"
              language={language === 'typescript' ? 'typescript' : language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={isDarkMode ? 'kodi-dark' : 'kodi-light'}
              options={{
                minimap: { enabled: false },
                fontSize: isSmallMobile ? 13 : 14,
                lineNumbers: isMobile ? 'off' : 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: isSmallMobile ? 12 : 16 },
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                fontLigatures: true,
                quickSuggestions: !isMobile,
                parameterHints: { enabled: !isMobile },
                wordWrap: 'on',
                wrappingIndent: 'indent',
                renderWhitespace: 'none',
                renderLineHighlight: 'all',
                smoothScrolling: true,
                mouseWheelZoom: false,
                accessibilitySupport: 'on',
                tabSize: 4,
                insertSpaces: true,
                detectIndentation: true,
                folding: true,
                foldingStrategy: 'indentation',
                showFoldingControls: 'always',
                matchBrackets: 'always',
                autoIndent: 'full',
                formatOnPaste: true,
                formatOnType: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnCommitCharacter: true,
                snippetSuggestions: 'top',
                emptySelectionClipboard: true,
                copyWithSyntaxHighlighting: true,
                multiCursorModifier: 'altCmd',
                accessibilityPageSize: 10,
                disableLayerHinting: false,
                disableMonospaceOptimizations: false,
                hideCursorInOverviewRuler: true,
                overviewRulerLanes: 0,
                overviewRulerBorder: false,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                cursorStyle: 'line',
                cursorWidth: isSmallMobile ? 2 : 1
              }}
            />
          </div>

          <div className="output-section">
            <div className="section-header">
              <Terminal size={16} />
              <span>Output</span>
              <button className="clear-btn" onClick={clearOutput}>
                <Trash2 size={14} />
                Clear
              </button>
            </div>
            <div className={`output-content ${isRunning ? 'running' : ''}`} ref={outputRef}>
              {output ? (
                <pre className={output.includes('Error:') ? 'error-text' : output.includes('successfully') ? 'success-text' : ''}>
                  {output}
                </pre>
              ) : (
                <div className="empty-output">
                  <Terminal size={48} />
                  <p>Click "Run Code" to see the output</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App