﻿namespace KMHSSS
{
    partial class Group_Master_Report_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.crystalReportViewer1 = new CrystalDecisions.Windows.Forms.CrystalReportViewer();
            this.label9 = new System.Windows.Forms.Label();
            this.View_Btn = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.crystalReportViewer1);
            this.groupBox2.Location = new System.Drawing.Point(25, 57);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(1260, 609);
            this.groupBox2.TabIndex = 19;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Report";
            // 
            // crystalReportViewer1
            // 
            this.crystalReportViewer1.ActiveViewIndex = -1;
            this.crystalReportViewer1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.crystalReportViewer1.Location = new System.Drawing.Point(21, 38);
            this.crystalReportViewer1.Name = "crystalReportViewer1";
            this.crystalReportViewer1.SelectionFormula = "";
            this.crystalReportViewer1.Size = new System.Drawing.Size(1211, 546);
            this.crystalReportViewer1.TabIndex = 31;
            this.crystalReportViewer1.ViewTimeSelectionFormula = "";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(569, 9);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(207, 27);
            this.label9.TabIndex = 34;
            this.label9.Text = "Group Master Report";
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(615, 17);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(84, 43);
            this.View_Btn.TabIndex = 19;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.View_Btn);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(30, 37);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1310, 688);
            this.groupBox1.TabIndex = 33;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Van Bill Report";
            // 
            // Group_Master_Report_Frm
            // 
            this.AcceptButton = this.View_Btn;
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.groupBox1);
            this.Name = "Group_Master_Report_Frm";
            this.Text = "Group Master Report";
            this.groupBox2.ResumeLayout(false);
            this.groupBox1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox2;
        private CrystalDecisions.Windows.Forms.CrystalReportViewer crystalReportViewer1;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.GroupBox groupBox1;
    }
}