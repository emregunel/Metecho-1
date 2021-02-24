import React from 'react';

import PathItem from '~js/components/path/pathItem';

interface PathProps {
  steps: string[];
  activeIdx?: number;
  isCompleted?: boolean;
}

const Path = ({ steps, activeIdx, isCompleted }: PathProps) => (
  <div className="slds-region_small">
    <div className="slds-path">
      <div className="slds-grid slds-path__track">
        <ul
          className="slds-path__nav"
          role="listbox"
          aria-orientation="horizontal"
        >
          {steps.map((step, idx) => (
            <PathItem
              key={idx}
              steps={steps}
              idx={idx}
              activeIdx={activeIdx}
              isCompleted={isCompleted}
            />
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Path;
