'use client';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef, useState } from 'react';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

interface IridescenceProps {
    color?: [number, number, number];
    speed?: number;
    amplitude?: number;
    mouseReact?: boolean;
    className?: string;
}

export function Iridescence({
    color = [1, 1, 1],
    speed = 0.5,
    amplitude = 0.1,
    mouseReact = false,
    className = 'h-full w-full',
}: IridescenceProps) {
    const ctnDom = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        if (!ctnDom.current) return;
        const ctn = ctnDom.current;
        const renderer = new Renderer();
        const gl = renderer.gl;
        gl.clearColor(1, 1, 1, 1);

        let program: Program;

        function resize() {
            const scale = 1;
            renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
            if (program) {
                program.uniforms.uResolution.value = new Color(
                    gl.canvas.width,
                    gl.canvas.height,
                    gl.canvas.width / gl.canvas.height
                );
            }
        }
        window.addEventListener('resize', resize, false);
        resize();

        const geometry = new Triangle(gl);
        program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new Color(...color) },
                uResolution: {
                    value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
                },
                uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
                uAmplitude: { value: amplitude },
                uSpeed: { value: speed }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animateId: number;

        function update(t: number) {
            animateId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        }
        animateId = requestAnimationFrame(update);
        ctn.appendChild(gl.canvas);

        function handleMouseMove(e: MouseEvent) {
            const rect = ctn.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            mousePos.current = { x, y };
            program.uniforms.uMouse.value[0] = x;
            program.uniforms.uMouse.value[1] = y;
        }
        if (mouseReact) {
            ctn.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', resize);
            if (mouseReact) {
                ctn.removeEventListener('mousemove', handleMouseMove);
            }
            ctn.removeChild(gl.canvas);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [color, speed, amplitude, mouseReact]);

    return <div ref={ctnDom} className={className} />;
}

const themeConfig: Record<string, [number, number, number]> = {
    luxury: [0.5, 0.5, 0.3],
    default: [0.9, 0.9, 0.9]
}

export default function Background(props: IridescenceProps) {
    const [themeColor, setThemeColor] = useState<[number, number, number]>(themeConfig.default);

    useEffect(() => {
        // 确保在客户端环境
        if (typeof document === 'undefined') return;

        // 获取当前主题
        const getCurrentTheme = (): string | null => {
            return document.documentElement.dataset.theme || null;
        };

        // 根据主题设置颜色
        const updateThemeColor = () => {
            const theme = getCurrentTheme();
            setThemeColor(theme === "luxury" ? themeConfig.luxury : themeConfig.default);
        };

        // 初始化主题颜色
        updateThemeColor();

        // 创建并启动MutationObserver监听主题变化
        try {
            const observer = new MutationObserver(() => {
                updateThemeColor();
            });

            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
            });

            // 清理函数
            return () => observer.disconnect();
        } catch (error) {
            console.warn('主题变化监听失败:', error);
            // 即使监听失败，也不应该影响组件的基本功能
        }
    }, []);

    return (
        <Iridescence {...props} color={themeColor} />
    );
}