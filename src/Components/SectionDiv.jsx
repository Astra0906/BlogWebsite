import React from 'react';

const SectionDivider = ({ title }) => {
    return (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <hr style={{ border: 'none', borderTop: '2px solid #ccc', width: '80%', margin: '0 auto' }} />
            <span className='bg-gray-900 text-white font-curx' style={{
                position: 'relative',
                top: '-12px', // Adjust as necessary to position the text over the line
                 // Match with your background color
                padding: '0 10px',
                fontSize: '24px', // Increase size as needed
                fontWeight: 'bold',
                fontFamily: 'cursive', // Cursive font
            }}>
                {title}
            </span>
            
        </div>
    );
};

export default SectionDivider;
